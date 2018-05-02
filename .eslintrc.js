//blog.guowenfh.com/2016/08/07/ESLint-Rules/ 配置参考文章
module.exports = {
  'root': true,
  // parser: 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 5,
    'sourceType': 'module'
  },
  'env': {
    'browser': true,
  },
  'extends': 'airbnb-base',
  /**
   *  "off" 或 0 - 关闭规则
   *  "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   *  "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  'rules': {
    // 要求箭头函数的参数使用圆括号
    'arrow-parens': 0,
    // tab 缩进 格数2
    'indent': ["error", 2],
    // 强制属性名称为驼峰风格
    'camelcase': 2,
    'no-var': 0,
    // 强制在 function的左括号之前使用一致的空格
    'space-before-function-paren': [2, "always"],
    'func-names': 0,
    // 禁止出现未使用过的变量
    'no-unused-vars': 2,
    // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef': 2,
    // 要求 IIFE 使用括号括起来
    "wrap-iife": [2, "any"],
    'prefer-arrow-callback': 0,
     // 不允许在变量定义之前使用它们
    'no-use-before-define': 2,
    'no-underscore-dangle': 0,
    'no-else-return': 0,
    'vars-on-top': 0,
    'no-restricted-syntax': 0,
    'no-restrictex': 0,
    // 强制在关键字前后使用一致的空格 (前后腰需要)
    'keyword-spacing': 1,
    'object-shorthand': 0,
    'comma-dangle': 0,
    'no-prototype-builtins': 0,
    'no-param-reassign': 0,
    'one-var': 0,
    'one-var-declaration-per-line': 0,
    // 禁止使用一元操作符 ++ 和 --
    'no-plusplus': 0, // ++ or --
    'consistent-return': 0,
    'linebreak-style': 0,
     // 禁止log
    'no-console': 0,
    'no-mixed-operators': 0,
    'no-alert': 0,
    'prefer-template': 0,
    'prefer-rest-params': 0,
    'no-unused-expressions': 0,
    // 强制把变量的使用限制在其定义的作用域范围内
    "block-scoped-var": 0,
    // 禁止 function 定义中出现重名参数
    "no-dupe-args": 2,
  }
}
