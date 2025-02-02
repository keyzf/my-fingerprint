
中文 | [English](./README_EN.md)

---

> [v2.2 版本更新](https://github.com/omegaee/my-fingerprint/releases/latest)

# My Fingerprint

- 可混淆各浏览器指纹标识
- 实用的`Chrome / Edge`扩展
- 安装即生效
- 可监控页面对指纹的访问情况
- 白名单模块

**支持指纹**
- [x] UserAgent系列
- [x] Screen系列
- [x] Canvas指纹
- [x] WebGL指纹
- [x] Audio指纹
- [x] 时区

# 目录
- [使用](#使用)
- [功能模块](#功能模块)
  - [配置模块](#配置模块)
  - [记录模块](#记录模块)
  - [白名单模块](#白名单模块)
- [测试目标](#测试目标)
- [支持一下](#支持一下)

# 使用

***插件安装：***
1. 下载扩展最新版本的`zip` -- [扩展下载](https://github.com/omegaee/my-fingerprint/releases/latest)
2. 打开浏览器扩展管理，开启开发者模式
3. 把下载好的`zip`拖拽进浏览器扩展管理页面
4. 启用扩展（若有需要，可在`详细信息`里勾选`InPrivate中允许`）

***插件使用：***
- 安装即生效（之前打开的标签页要刷新才生效）
- （可选）左键插件图标进入配置页面进行自定义配置

***前置：***
- 支持`Manifest V3`扩展的浏览器（大多数浏览器都支持）

# 功能模块

<img src='./images/zh/ui.png' width='360px' />

## 配置模块
- 用于对各种指纹的自定义

> 目前支持选项：
> - 系统值
> - 自定义值（某些）
> - 每个标签页随机值
> - 每次启动浏览器随机值
> - 根据访问域名随机值
> - 根据全局种子随机值

- **基础指纹配置**
  - [x] 设备信息 (UserAgent系列)
  - [x] 浏览器语言
  - [x] 逻辑处理器数量
  - [x] 屏幕尺寸
  - [x] 屏幕颜色深度
  - [x] 屏幕位深度
- **特殊指纹配置**
  - [x] 时区
  - [x] Canvas画布指纹
  - [x] Audio音频指纹
  - [x] WebGL指纹
- **其他配置**
  - [x] 语言 - 扩展使用语言
  - [x] 全局种子 - 作用于指纹配置的全局种子选项
  - [x] 网络请求钩子 - 对网络请求进行修改（`设备信息`）
  - [x] 空白源Iframe钩子 - 对空白源Iframe进行注入

## 记录模块
> 显示了当前标签页对各种指纹的访问次数

## 白名单模块
> 可对以白名单列表进行编辑


# 测试目标
- [x] https://www.yalala.com/
- [x] https://uutool.cn/browser/
- [x] https://www.ip77.net/
- [x] https://www.browserscan.net/


# 支持一下
- 本项目免费开源，如果你觉得对你有帮助，请给我一颗Star
- 如果有好的建议或意见，欢迎提交Issue或Pull Request
- 欢迎赞赏支持

| 微信 |
| :---: |
| <img src='./images/wechat-code.png' title='微信' width='210px' height='210px'  /> |