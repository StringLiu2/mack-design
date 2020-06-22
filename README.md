## ts仿实现ant-design库

##### 文档地址 [https://StringLiu2.github.io/mack-design](https://StringLiu2.github.io/mack-design)

```$ 
    yarn add mack-design 
    // or
    npm i mack-design 
```

### 引入方式
```js
    import { Button } from 'mack-design';
```

### 引入样式文件
```js
    import 'mack-design/dist/index.css';
```

### ```学习要点```

##### ```1. ts的Omit、Partial和React自身提供的xxxHTMLAttributes相关泛型类型、FunctionComponentProps等的类型定义使用```

##### ```2. 知道scss的变量、each、mixin的使用```

##### ```3. react开发组件库的流程```

##### ```4. 对@testing-library相关的测试，和一些扩展的jest测试API学习，异步测试,如何测试拖拽相关```

##### ```5. 使用storybook，知道如何配置storybook以及使用，生成文档```

##### ```6. npm发布、git提交以及Travis-CI的文档部署```

##### ```7. 总体上知道项目开发到部署的流程，CI/CD的相关概念  ```

#### ```---------------------------------知识点总结----------------------------------```

## 1.开始

### 1.1创建项目
```$
    npx create-react-app mack-design --typescript
```

### 1.2安装相关依赖

#### 安装font-awesome图标库相关依赖
```$
    yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome -S 
```

#### 安装axios请求依赖
```$
    yarn add axios -S
```

#### 安装 classnames生成className、react-transition-group动画库
```$
    yarn add classnames react-transition-group -S
    // and 类型声明文件
    yarn add @types/classnames @types/react-transition-group -D
```
#### 测试相关，新版本create-react-app这个脚手架自带

#### 生成storybook文档的命令 [storybook for react](https://storybook.js.org/docs/guides/guide-react/) 下面命令自动生成
```$
    npx -p @storybook/cli sb init
```

### 1.3 添加文档的相关库，配置.storybook/webpack.config.js

#### 安装依赖 @storybook/addon-info(生成文档字段介绍和代码) 
```$
    yarn add @storybook/addon-info -S
    yarn add @types/storybook__addon-info -D
```
```js
    // .storybook/webpack.config.js配置
    // webpack配置提供给storybook
    module.exports = ({ config }) => {
        config.module.rules.push({
            test: /\.tsx?$/,
            use: [
            {
                loader: require.resolve("babel-loader"),
                options: {
                presets: [require.resolve("babel-preset-react-app")]
                }
            },
            {
                // 通过react代码生成表格
                loader: require.resolve('react-docgen-typescript-loader'),
                options: {
                // 把那些字面值常量、联合类型等用字符串展开
                shouldExtractLiteralValuesFromEnum: true, 
                // 过滤props
                propFilter(props) {
                    // 如果是node_module就就false
                    if(props.parent) return !props.parent.fileName.includes('node_modules');
                    // 默认true
                    return true;
                }
                }
            }
            ]
        });

        config.resolve.extensions.push(".ts", ".tsx");

        return config;
    };

```


### 安装文档生成库，react-ts的 react-docgen-typescript-loader
```$
    yarn add react-docgen-typescript-loader -D
```

### 1.4 安装打包前所需要的库
```$
    yarn add rimraf cross-env husky -S
```
##### ```rimraf 是兼容window、mac、linux系统，用来删除文件夹、文件的命令 ```
##### ```cross-env 是兼容window、mac、linux系统的配置env的命令```
##### ```husky 哈士奇钩子package.json的配置工具，可以在运行git提交前进行一系列的命令```
```js
    // package.json
    {
    "husky": {
        "hooks": {
        "pre-commit": "npm run test:nowatch && npm run lint"
        }
    }
    }
```

## 2.生成需要打包的库

### 2.1 设置tsconfig.build.json
```js
{
    "compilerOptions": {
        "outDir": "dist", // 代码生成的文件夹
        "module": "ESNext", // 支持的模块、AMD、CMD、UMD、COMMONJS、ES6、ESNext等
        "target": "ES5",
        "declaration": true, // 生成.d.ts文件，类型声明文件
        "jsx": "react", // react、react-native ...
        "moduleResolution": "node", // 查找文件的方式，不要classic
        "allowSyntheticDefaultImports": true // 需要直接引入 不是 import * as React from 'react'
    },
    // 包含的文件
    "include": [
        "src"
    ],
    // 不包含的文件
    "exclude": [
        "src/**/*.test.tsx",
        "src/**/*.stories.tsx"
    ]
}
```

### 2.2 在package.json中设置对应的命令和配置
```js
{
    // 描述
    "description": "test React components library",
    // 作者
    "author": "mack liu",
    // 许可证，正常都是MIT
    "license": "MIT",
    "keywords": [ // npm上搜索的关键字
        "mack-design"
    ],
    // 是否是私有的
    "private": false,
    // 对应的首页页面地址
    "homepage": "https://github.com/StringLiu2/mack-design",
    // 仓库地址
    "repository": {
        "type": "git",
        "url": "https://github.com/StringLiu2/mack-design"
    },
    // 主入口文件
    "main": "dist/index.js",
    // 主模块文件
    "module": "dist/index.js",
    // 类型声明文件，可以多个
    "types": "dist/index.d.ts",
    // 发布到npm上面的时候的文件，就一个dist
    "files": [
        "dist"
    ],
    // 提示用户需要按照的依赖项，正常不需要用户安装的，都是打包，声明相关的，都放在devDependencies上面
    "peerDependencies": {
        "react": ">=16.8.0",
        "react-dom": ">=16.8.0"
    },
     "scripts": {
        "start": "react-scripts start",
        // 打包命令，执行删除文件夹，然后通过tsconfig.build.json打包tsx文件，最后执行scss打包命令
        "build": "npm run delete && npm run build:ts && npm run build:scss",
        "delete": "rimraf ./dist",
        "build:ts": "tsc -p tsconfig.build.json",
        "build:scss": "node-sass ./src/styles/index.scss ./dist/index.css",
        "test": "react-scripts test",
        // 测试不watch、设置process.env.CI为true，然后运行即可
        "test:nowatch": "cross-env CI=true react-scripts test",
        // eslint检查，后缀是js,jsx,ts,tsx，检查文件夹是src、最多警告只能10个
        "lint": "eslint --ext js,jsx,ts,tsx src --max-warnings 10",
        "eject": "react-scripts eject",
        // 运行storybook文档，开启一个服务
        "storybook": "start-storybook -p 9009 -s public",
        // 打包生成静态的storybook文档
        "build-storybook": "build-storybook -s public",
        // 在npm publish之前的配置，测试+检查、然后打包，最终才提交到npm上面
        "prepublishOnly": "npm run test:nowatch && npm run lint && npm run build"
    },
    // 哈士奇，git提交之前的操作
    "husky": {
        "hooks": {
            "pre-commit": "yarn test:nowatch && yarn lint"
        }
    },
}
```

### 2.3 打包前的本地测试

#### 先对项目进行 npm link mack-design 进行相关的映射到本地
```$
    npm link mack-design
```

#### 这时候会因为项目和库都使用了react，造成冲突，指定到项目的react (默认会在自己的node_modules下面找，就造成了这个问题)
```$
    npm link ./test-mack-design/node_modules/react进行指定相同的react包和版本
```


### 2.4 配置npm、git

#### 配置npm，上传
```js
    // npm whoami 查看是否登录了，报错就没有登录

    // npm config ls 查看源，不能是淘宝的源

    // npm adduser 进行登录

    // npm publish 发布
```

#### 配置上传git
```js
    // 在github创建一个仓库

    // 判断是否连接到仓库 git remote -v 

    // 进行远程仓库连接 git remote add origin url

    // 开始进行提交
    // git add .  
    // git commit -m 'commit message'
    // git push origin master

    // 如果报错
    // git pull origin master
    // 然后执行git add . 和后面两个命令
```

## 3.集成和部署

### CI - 持续集成

- 频繁的将代码集成到主干(master)
- 快速发现错误
- 防止分支大幅度偏离主干


### CD - 持续交付、持续部署

- 频繁的将软件的新版本，交付给质量团队或者用户
- 代码通过部署之后，自动部署到生产环境中

### Travis CI 在线CI/CD测试和部署的平台

### 我们需要登录 [www.travis-ci.com](https://www.travis-ci.com) 上面登录，然后同意即可

#### 这时候我们需要在根目录下创建一个.travis.yml文件，代码如下 ，然后在提交后会自动在Travis CI运行下面的配置文件
```env
    # 这个文件会自动在你git push 项目的成功后运行 npm install  or npm ci (ci -> 运行.lock相关的版本锁文件)
    language: node_js # 使用语言
    node_js: # 语言的版本
        - "stable"
    cache: # 使用缓存
    directories:
        - node_modules
    env: # 环境变量
        - CI=true
    # 等待travis CI运行成功，这时候我们需要进行文档部署到travis CI (下面就是自动化部署的配置)
    script:
        - npm run build-storybook # 自动运行这个命令，生成静态文件
    deploy:
        provider: pages
        skip_cleanup: true
        github_token: $github_token # 生成的token 32ab2812d8e8790860f134af8ece6240f1cdf276
        local_dir: storybook-static # 上传哪个文件夹的文件
        on:
            branch: master # 哪个branch分支发生变化就执行
```