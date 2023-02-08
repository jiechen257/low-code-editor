# H5-Editor

预览地址：[H5-Editor](http://101.35.195.5:8989/#/home)

## 项目介绍

### 技术栈

`Vue + Vant UI + Strapi + MySQL`

### 视图

![image](https://user-images.githubusercontent.com/73946940/217527947-e9f0479a-95c9-4073-85a8-f8bb29becf3d.png)

### 功能

- 封装一套 H5 业务组件库，利⽤ drag API 拖拽组件实现布局，达到可视化编辑的效果
- ⽀持可视化编辑组件属性，通过 iframe 和 postMessage 通信实现 H5 ⻚⾯在线预览
- 利⽤ FileSaver 将⻚⾯状态转为 JSON ⽂件导⼊导出，实现页面状态持久化


## 项目启动

```
yarn install

yarn serve
```
