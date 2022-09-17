import React from 'react';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions';
import Upload, { UploadFile } from './upload';
import Icon from '../Icon/icon';
import Button from '../Button/button';

const defaultUpload = () => (
    <Upload
        action="https://jsonplaceholder.typicode.com/posts/"
        onProgress={action('progress')}
        onSuccess={action('success')}
        onError={action('error')}
        onChange={action('change')}
        onRemove={action('remove')}
    >default</Upload>
);

const cycleLifeUpload = () => {
    const beforeUpload = (file: UploadFile) => {
        if (file.size > 50000) {
            console.log('上传文件太大');
            return false;
        }
        return true;
    }
    return (
        <Upload
            action="https://jsonplaceholder.typicode.com/posts/"
            beforeUpload={beforeUpload}
            onProgress={action('progress')}
            onSuccess={action('success')}
            onError={action('error')}
            onChange={action('change')}
        ><Button>upload file</Button></Upload>
    )
}

const promiseUpload = () => {
    const beforeUpload = (file: UploadFile) => {
        const newFile = new File([file.raw!], 'new_name.docx', { type: file.raw?.type });
        return Promise.resolve({
            ...file,
            name: newFile.name
        });
    }
    return (
        <Upload
            action="https://jsonplaceholder.typicode.com/posts/"
            beforeUpload={beforeUpload}
            onProgress={action('progress')}
            onSuccess={action('success')}
            onError={action('error')}
            onChange={action('change')}
        ><Button>upload file</Button></Upload>
    )
}

const defaultFileLisUpload = () => {
    const fileList: UploadFile[] = [
        {
            uid: Date.now().toString(),
            name: 'test1.docx',
            size: 30000,
            status: 'success',
        },
        {
            uid: Date.now().toString() + '333',
            name: 'test4.docx',
            size: 50000,
            status: 'uploading',
            percent: 30
        },
        {
            uid: Date.now().toString() + '111',
            name: 'test2.docx',
            size: 50000,
            status: 'error',
        },
    ];
    return (
        <Upload
            action="https://jsonplaceholder.typicode.com/posts/"
            defaultFileList={fileList}
            onProgress={action('progress')}
            onSuccess={action('success')}
            onError={action('error')}
            onChange={action('change')}
        ><Button>upload file</Button></Upload>
    );
};

const customOptionsUpload = () => {
    return (
        <Upload
            action="https://jsonplaceholder.typicode.com/posts/"
            data={{ name: 'liu' }} // 自定义data
            headers={{
                'custom-header': 'mack-liu'
            }}
            withCredentials={false}
            name="file" // 文件字段名
            accept="application/json"
            multiple={true}
            onProgress={action('progress')}
            onSuccess={action('success')}
            onError={action('error')}
            onChange={action('change')}
        >
            <Button>upload file</Button>
        </Upload>
    );
}

const dropUploadFile = () => (
    <Upload
        action="https://jsonplaceholder.typicode.com/posts/"
        drag={true}
    >
        <Icon icon="upload" size="4x" />
        <br />
        <br />
        <span>上传文件</span>
    </Upload>
);

storiesOf('Upload Component', module)
    .add('Upload', defaultUpload)
    .add('complete cycleLife Upload Component', cycleLifeUpload)
    .add('beforeUpload return Promise - Upload', promiseUpload)
    .add('default fileList - Upload', defaultFileLisUpload)
    .add('custom http options - Upload', customOptionsUpload)
    .add('drop upload file - Upload', dropUploadFile)