import React, { createContext, useState, useMemo } from 'react';
import classNames from 'classnames';
import TabItem from './tabItem';
export var TabsContext = createContext({});
/**
 * ### 引用方式
 * ~~~js
 * import { Tabs } from 'mack-design';
 * ~~~
 */
export var Tabs = function (_a) {
    var className = _a.className, style = _a.style, mode = _a.mode, children = _a.children, defaultIndex = _a.defaultIndex, onSelect = _a.onSelect;
    var _b = useState(defaultIndex), currentIndex = _b[0], setIndex = _b[1];
    var _c = useState(), child = _c[0], renderChildren = _c[1];
    // 创建Context，存储对应的数据
    var contextValue = useMemo(function () { return ({
        index: currentIndex,
        onSelect: function (activeIndex) {
            var _a;
            setIndex(activeIndex);
            (_a = onSelect) === null || _a === void 0 ? void 0 : _a(activeIndex);
        },
        renderChildren: renderChildren
    }); }, [onSelect, currentIndex]);
    // className => tabs || tabs tabs-card
    var classes = classNames('tabs', className, {
        'tabs-card': mode === 'card',
    });
    // 筛选后的children
    var selectedChildren = useMemo(function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "TabItem") {
                return React.cloneElement(childElement, { index: index.toString() });
            }
            console.error('Warning: Tabs has a child which is not a TabItem component');
        });
    }, [children]);
    return (React.createElement(React.Fragment, null,
        React.createElement("ul", { className: classes, style: style, "data-testid": "test-tab-ul" },
            React.createElement(TabsContext.Provider, { value: contextValue }, selectedChildren)),
        React.createElement("div", null, child)));
};
Tabs.Item = TabItem;
Tabs.defaultProps = {
    mode: 'tab',
    defaultIndex: '0'
};
export default Tabs;
