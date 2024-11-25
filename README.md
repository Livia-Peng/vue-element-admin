### 编码规范

#### 1. ESLint

- 插件化的 JavaScript 代码检测工具
- 基础配置项：

```js
// 遵循 commonJS 导出规则
module.exports = {
  // 表示当前目录即为根目录，ESLint 规则将被限制到该目录下
  root: true,
  // 表示启用 ESLint 检测的环境
  env: {
    node: true,
  },
  // ESLint 中基础配置需要继承的配置
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard', // 标准规则
  ],
  // 解析器
  parserOptions: {
    parser: 'babel-eslint',
  },
  // 需要修改的启用规则及各自的错误级别 规则key: 级别value
  /**
   * 错误级别
   * "off"/0: 关闭规则
   * "warn"/1: 使用警告级别的错误：warn，不会导致程序退出
   * "error"/2: 使用错误级别的错误：error，触发时会导致程序退出
   */
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
```

#### 2. prettier

- 代码格式化工具，开箱即用
- 在保存代码时，让代码直接符合 ESLint 标准
- 基础配置项：

```json
{
  "semi": false, // 不尾随分号
  "singleQuote": true, // 使用单引号
  "trailingComma": "none" // 多行分割语法中，最后一行不加逗号
}
```
