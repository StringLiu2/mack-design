import '@testing-library/jest-dom/extend-expect';
import React from 'react'
import axios, { AxiosStatic } from 'axios'
import { render, RenderResult, fireEvent, wait, createEvent } from '@testing-library/react'
import Upload, { UploadProps, UploadFile } from './upload';

// 模拟，把显示的图标变成文字，可以测试文字是否出现
jest.mock('../Icon/icon', () => {
    return ({ icon, onClick }: any) => {
        // 需要拿出这个点击事件
        return <span onClick={onClick}>{icon}</span>
    }
});

const testProps: UploadProps = {
    action: 'test.com',
    onSuccess: jest.fn(),
    beforeUpload: jest.fn(),
    onChange: jest.fn(),
    onError: jest.fn(),
    onProgress: jest.fn(),
    onRemove: jest.fn(),
    drag: true // 拖拽的支持
}

// 模拟axios，接管axios
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<AxiosStatic>; // 转换成模拟的axios对象

let wrapper: RenderResult,
    fileInput: HTMLInputElement,
    uploadArea: HTMLElement;

// 测试的文件对象
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })
// 创建生成的uploadFile对象
const uploadFile: UploadFile = {
    "name": testFile.name,
    "percent": expect.any(Number),
    "raw": testFile,
    "response": expect.any(String),
    "size": testFile.size,
    "status": expect.any(String),
    "uid": expect.any(String)
};
describe('test Upload Component', () => {
    beforeEach(() => {
        wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
        fileInput = wrapper.container.querySelector('.file-input') as HTMLInputElement;
        uploadArea = wrapper.queryByText('Click to upload')!;
    });
    it('upload process should works fine', async () => {
        const { queryByText } = wrapper;
        // 模拟post的实现
        // mockedAxios.post.mockImplementation(() => {
        //     return Promise.resolve({ 'data': 'test' })
        // });
        mockedAxios.post.mockResolvedValue({ 'data': 'test' });
        expect(uploadArea).toBeInTheDocument();
        // 看不到的
        expect(fileInput).not.toBeVisible();
        // 触发change方法，传递一个对象，触发文件上传过程
        fireEvent.change(fileInput, { target: { files: [testFile] } });
        // 先调用这个方法，然后调用change，success
        expect(testProps.beforeUpload).toHaveBeenCalled();
        // 出现loading图标，其实就是icon的spinner
        // 异步不明显的话, 直接上传成功 没有loading...
        // expect(queryByText('spinner')).toBeInTheDocument();
        await wait(() => {
            expect(queryByText('test.png')).toBeInTheDocument();
        });
        expect(queryByText('test.png')).toHaveClass('file-name-success');
        // 成功的图标
        expect(queryByText('check-circle')).toBeInTheDocument();
        expect(testProps.onChange).toHaveBeenCalledWith(uploadFile);
        // 然后成功调用，返回两个参数，一个是tets，一个是uploadFile对象
        expect(testProps.onSuccess).toHaveBeenCalledWith('test', uploadFile);

        // remove the uploaded file
        expect(queryByText('times')).toBeInTheDocument();
        // 点击删除
        fireEvent.click(queryByText('times')!);
        // 触发remove事件，这个节点没有了 (记得模拟的时候传递onClick，才有用)
        expect(queryByText('test.png')).not.toBeInTheDocument();
        expect(testProps.onRemove).toHaveBeenCalledWith(uploadFile);
    });
    // 文件上传失败的操作
    it('upload file error should works fine', async () => {
        const { queryByText } = wrapper;
        mockedAxios.post.mockRejectedValue({ 'message': 'test error' });
        // 触发上传事件
        fireEvent.change(fileInput, { target: { files: [testFile] } });
        // expect(queryByText('spinner')).toBeInTheDocument();
        await wait(() => {
            expect(queryByText('test.png')).toBeInTheDocument();
        });
        expect(queryByText('test.png')).toHaveClass('file-name-error');
        // 失败的标识
        expect(queryByText('times-circle')).toBeInTheDocument();
        expect(testProps.onChange).toHaveBeenCalledWith(uploadFile);
        // 然后成功调用，返回两个参数，一个是tets，一个是uploadFile对象
        expect(testProps.onError).toHaveBeenCalledWith({ 'message': 'test error' }, expect.objectContaining({
            error: { "message": "test error" }
        }));
    })
    // 大魔王级别难度的 drag拖拽上传
    it('drag and drop files should works fine', async () => {
        const { queryByText } = wrapper;
        mockedAxios.post.mockResolvedValue({ 'data': 'test' });
        fireEvent.dragOver(uploadArea);
        expect(uploadArea).toHaveClass('is-dragover');
        fireEvent.dragLeave(uploadArea);
        expect(uploadArea).not.toHaveClass('is-dragover');
        // todo 解决drop拖拽上传时dataTransfer对象不存在的问题
        // 创建一个event对象
        const mockDropEvent = createEvent.drop(uploadArea);
        // const testFileList = [testFile]; 
        // 在event上定义了这个变量，里面有这些属性
        Object.defineProperty(mockDropEvent, 'dataTransfer', {
            value: {
                files: [testFile]
            }
        })
        // 然后这样调用
        fireEvent(uploadArea, mockDropEvent);
        // todo -----------------------------------------
        await wait(() => {
            expect(queryByText('test.png')).toBeInTheDocument();
        });
        expect(queryByText('test.png')).toHaveClass('file-name-success');
    })
})