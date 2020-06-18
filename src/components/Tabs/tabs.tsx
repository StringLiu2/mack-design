import React, { createContext, useState, useMemo } from 'react'
import classNames from 'classnames';
import TabItem, { TabItemProps } from './tabItem';


type TabMode = "tab" | "card";

type SelectCallback = (selectedIndex: string) => void;

export interface TabsProps {
    mode?: TabMode; // tab模式和card卡片模式
    defaultIndex?: string; // 默认选中哪个
    className?: string;
    style?: React.CSSProperties;
    onSelect?: SelectCallback; // 点击之后触发的事件
}
interface TabsProperties {
    Item: typeof TabItem,
}
interface ITabsContext {
    index: string;
    onSelect: SelectCallback;
    renderChildren: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}
export const TabsContext = createContext<ITabsContext>({} as ITabsContext);

const Tabs: React.FC<TabsProps> & TabsProperties = ({
    className,
    style,
    mode,
    children,
    defaultIndex,
    onSelect
}) => {
    const [currentIndex, setIndex] = useState<string>(defaultIndex!);
    const [child, renderChildren] = useState<React.ReactNode>();
    // 创建Context，存储对应的数据
    const contextValue = useMemo<ITabsContext>(() => ({
        index: currentIndex,
        onSelect(activeIndex: string) {
            setIndex(activeIndex);
            onSelect?.(activeIndex);
        },
        renderChildren
    }), [onSelect, currentIndex]);
    // className => tabs || tabs tabs-card
    const classes = classNames('tabs', className, {
        'tabs-card': mode === 'card', // 当是使用card模式，添加这个className
    });
    // 筛选后的children
    const selectedChildren = useMemo(() =>
        React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<TabItemProps>;
            const { displayName } = childElement.type;
            if (displayName === "TabItem") {
                return React.cloneElement(childElement, { index: index.toString() });
            }
            console.error('Warning: Tabs has a child which is not a TabItem component');
        })
        , [children]);
    return (
        <>
            <ul className={classes} style={style} data-testid="test-tab-ul">
                <TabsContext.Provider value={contextValue}>
                    {selectedChildren}
                </TabsContext.Provider>
            </ul>
            <div>
                {child}
            </div>
        </>
    );
}

Tabs.Item = TabItem;

Tabs.defaultProps = {
    mode: 'tab',
    defaultIndex: '0'
}
export default Tabs
