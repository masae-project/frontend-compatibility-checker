# 前端兼容性检查工具

## 功能

进入该网页，将自动进行一系列测试：

00. 取得浏览器详细信息
01. 检查 HTML5 兼容性
02. 检查 Canvas 兼容性
03. 检查 SVG 兼容性
04. 检查 CSS 选择器
05. 检查 CSS Keyframes 动画
06. 检查 CSS Transition 动画
07. 检查 ES6 兼容性
08. 检查 Event 事件
09. 检查 JSON 序列化和解析
10. 检查 映射和集合支持
11. 检查 代理方法
12. 检查 自定义元素
13. 检查 Storage 存储
14. 检查 WebGL 支持

## 可配置变量

- `urlOK`: 在检测全部通过后，要跳转到的网址
  - 空: 不跳转; `a`: 显示一个弹出提示框。
- `urlFail`: 在检测未完全通过时，要跳转到的网址
  - 空: 不跳转; `a`: 显示一个弹出提示框。
- `viewInfo`: 在页面中显示详细信息（否则只有提示信息和进度条）
- `saveStorage`: 保存记录到:
  - 0.禁用 1.会话存储 2.持久存储
- `saveStorageKey`: 如果存储记录，键名是？（值将写入 `0` 或 `1` ）

# LICENCE

Copyright (c) 2022 KagurazakaYashi frontend-compatibility-checker is licensed under Mulan PSL v2. You can use this software according to the terms and conditions of the Mulan PSL v2. You may obtain a copy of Mulan PSL v2 at: http://license.coscl.org.cn/MulanPSL2 THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE. See the Mulan PSL v2 for more details.
