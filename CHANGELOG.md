# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.1.2](https://gitee.com/shirkhan/khan-alphabet/compare/v1.1.1...v1.1.2) (2022-04-08)


### Features

* 新增uly的 format功能,目前只替换双字符,将来完成规范中的更多规范的自动补充格式化 ([1f84228](https://gitee.com/shirkhan/khan-alphabet/commit/1f84228cd0f11ffac626783c67659a8b995f6db3))

### [1.1.1](https://gitee.com/shirkhan/khan-alphabet/compare/v1.1.0...v1.1.1) (2022-04-08)


### Bug Fixes

* uly to khan-uz 修复 h 字符生成组合字符错误导致的h 无法正确处理问题 ([b45e444](https://gitee.com/shirkhan/khan-alphabet/commit/b45e444b50b1af9cbb607dc5bdc3486bb1572cf1))

## [1.1.0](https://gitee.com/shirkhan/khan-alphabet/compare/v1.0.1...v1.1.0) (2022-04-07)


### Features

* 新增khan-uz 转换uly. khan-uz 目录结构微调 ([9d0cae7](https://gitee.com/shirkhan/khan-alphabet/commit/9d0cae7aea6c17c0d2cfa9247e59e2ee619b8033))
* 新增uly转khan-uz的转换 ([e2aae5b](https://gitee.com/shirkhan/khan-alphabet/commit/e2aae5b276537dc929205bfa122c496056f4625e))


### Bug Fixes

* 去掉模块标记 ([1d65097](https://gitee.com/shirkhan/khan-alphabet/commit/1d65097c072d18a33b5ac014f347085f71eaff84))
* 修复uly to khan-uz 部分边界情况下的bug ([3d9dcb0](https://gitee.com/shirkhan/khan-alphabet/commit/3d9dcb0420e465e3de263b81a2999aca67fc9293))

### [1.0.1](https://gitee.com/shirkhan/khan-alphabet/compare/v1.0.0...v1.0.1) (2022-03-10)


### Bug Fixes

* 因remark的导出导致的vscode等node环境报document.body找不到错误临时屏蔽 ([d338f9c](https://gitee.com/shirkhan/khan-alphabet/commit/d338f9c55cf347692d13b686bcca6b9845026418))

## [1.0.0](https://gitee.com/shirkhan/khan-alphabet/compare/v0.1.0...v1.0.0) (2022-03-10)

## [0.1.0](https://gitee.com/shirkhan/khan-alphabet/compare/v0.0.2...v0.1.0) (2022-03-10)


### Features

* 构建参数和位置调整 ([1c21bd6](https://gitee.com/shirkhan/khan-alphabet/commit/1c21bd64302b0b8ced250f8d301266e2429f5f33))
* 新增github-actions badge ([fc41b91](https://gitee.com/shirkhan/khan-alphabet/commit/fc41b911e7601b9db66ed1709d4a778fb8223580))
* 新增remark 功能 ([48e4c9d](https://gitee.com/shirkhan/khan-alphabet/commit/48e4c9dbc21d73626c5f18117f0a0a6f40ead321))
* 新增travis脚本 ([ccbcacc](https://gitee.com/shirkhan/khan-alphabet/commit/ccbcacca2ca1ee4b2d86f73d5eb0431f84b9c6f8))

### [0.0.2](https://gitee.com/shirkhan/khan-alphabet/compare/v0.0.1...v0.0.2) (2022-03-10)


### Features

* 解决khan-uz基础上编写khan内容时的n+g被识别成ng的问题 ([137adcd](https://gitee.com/shirkhan/khan-alphabet/commit/137adcd4ee64baab546ed7f408763ee8b6d4f01a))
* khan,khan-uz,uly 等多个转换中的大小写识别问题再次优化 ([58088a5](https://gitee.com/shirkhan/khan-alphabet/commit/58088a5635638727934d29594eab3d5869303463))
* update github action ([0b35509](https://gitee.com/shirkhan/khan-alphabet/commit/0b355091d15ca34999d1dd2811af9f81efb57d71))


### Bug Fixes

* khan 2 khan-uz 存在n+g问题修复,测试用例完善,khan-uz转ug时的hemze逻辑完善 ([c43462e](https://gitee.com/shirkhan/khan-alphabet/commit/c43462e11dcf41aa930e03c07d13ce1be12dba98))

### 0.0.1 (2022-03-09)


### Features

* 母语转khan-uz 转换器功能完成 ([87fda90](https://gitee.com/shirkhan/khan-alphabet/commit/87fda90b990030a3fcccea1c52758a178a477291))
* 目录结构微调,不中必要注释 ([7f243c4](https://gitee.com/shirkhan/khan-alphabet/commit/7f243c49555f4b241d85587fcd4048708492d337))
* 去掉多余,冗余,不太合理的部分 ([89c6942](https://gitee.com/shirkhan/khan-alphabet/commit/89c6942e5f97f209af5b8352eff351f0757a8d63))
* 项目初始化 ([5ed6118](https://gitee.com/shirkhan/khan-alphabet/commit/5ed6118149f8631c4aeaf10e84fd2422027f347e))
* 新增 alphabet 基础类和功能 ([87dd152](https://gitee.com/shirkhan/khan-alphabet/commit/87dd152ceca7efe986b3af18e48e716f318476d1))
* 新增测试用例 ([6c9b1b6](https://gitee.com/shirkhan/khan-alphabet/commit/6c9b1b6ccee5fbd198e408a6e113be78a1fc30ff))
* 新增change log ([b6f257c](https://gitee.com/shirkhan/khan-alphabet/commit/b6f257cb635e5a7172c9eb8bd0be12671f364ed1))
* 新增khan-uz to khan 功能,修复khan-uz转ug的标点符号不正确问题 ([e6f9e7b](https://gitee.com/shirkhan/khan-alphabet/commit/e6f9e7b2458a1ab352254aa63c46ff4ac2481972))
* 新增khan-uz转ug的功能 ([87bfaec](https://gitee.com/shirkhan/khan-alphabet/commit/87bfaec0ed8a1f390ba27f9b827639bf10768fd5))
* khan to khan-uz 功能完成 ([21886cc](https://gitee.com/shirkhan/khan-alphabet/commit/21886cce69d261e631d9afddf9370e8a3ecbe17a))
* khan-uz 功能全部完成 ([101b137](https://gitee.com/shirkhan/khan-alphabet/commit/101b137829a22378bb6c89708d37777a16beed77))
* retext之 parser和plugin基础架子准备好了 ([83a5b22](https://gitee.com/shirkhan/khan-alphabet/commit/83a5b22bc9b7549dcff1cccb89cd6c4c5f716278))


### Bug Fixes

* 母语转khan-uz时的标点符号缺少转义问题修复 ([9b50493](https://gitee.com/shirkhan/khan-alphabet/commit/9b50493b31391f5c7addd485bed50f53cc857995))
* test 字段名错误问题修复 ([19f4f60](https://gitee.com/shirkhan/khan-alphabet/commit/19f4f602febfe4d01c4f3415fdfc4d6fe904bafd))

# 0.0.0 (2022-03-09)

### Bug Fixes

- 母语转 khan-uz 时的标点符号缺少转义问题修复 ([9b50493](https://gitee.com/shirkhan/khan-alphabet/commits/9b50493b31391f5c7addd485bed50f53cc857995))
- test 字段名错误问题修复 ([19f4f60](https://gitee.com/shirkhan/khan-alphabet/commits/19f4f602febfe4d01c4f3415fdfc4d6fe904bafd))

### Features

- 母语转 khan-uz 转换器功能完成 ([87fda90](https://gitee.com/shirkhan/khan-alphabet/commits/87fda90b990030a3fcccea1c52758a178a477291))
- 目录结构微调,不中必要注释 ([7f243c4](https://gitee.com/shirkhan/khan-alphabet/commits/7f243c49555f4b241d85587fcd4048708492d337))
- 去掉多余,冗余,不太合理的部分 ([89c6942](https://gitee.com/shirkhan/khan-alphabet/commits/89c6942e5f97f209af5b8352eff351f0757a8d63))
- 项目初始化 ([5ed6118](https://gitee.com/shirkhan/khan-alphabet/commits/5ed6118149f8631c4aeaf10e84fd2422027f347e))
- 新增 alphabet 基础类和功能 ([87dd152](https://gitee.com/shirkhan/khan-alphabet/commits/87dd152ceca7efe986b3af18e48e716f318476d1))
- 新增测试用例 ([6c9b1b6](https://gitee.com/shirkhan/khan-alphabet/commits/6c9b1b6ccee5fbd198e408a6e113be78a1fc30ff))
- 新增 khan-uz to khan 功能,修复 khan-uz 转 ug 的标点符号不正确问题 ([e6f9e7b](https://gitee.com/shirkhan/khan-alphabet/commits/e6f9e7b2458a1ab352254aa63c46ff4ac2481972))
- 新增 khan-uz 转 ug 的功能 ([87bfaec](https://gitee.com/shirkhan/khan-alphabet/commits/87bfaec0ed8a1f390ba27f9b827639bf10768fd5))
- khan to khan-uz 功能完成 ([21886cc](https://gitee.com/shirkhan/khan-alphabet/commits/21886cce69d261e631d9afddf9370e8a3ecbe17a))
- khan-uz 功能全部完成 ([101b137](https://gitee.com/shirkhan/khan-alphabet/commits/101b137829a22378bb6c89708d37777a16beed77))
- retext 之 parser 和 plugin 基础架子准备好了 ([83a5b22](https://gitee.com/shirkhan/khan-alphabet/commits/83a5b22bc9b7549dcff1cccb89cd6c4c5f716278))
