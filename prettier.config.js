/**
 * uni-app prettier 配置,和 vue 项目有一些区别！！！
 * @url https://prettier.io/docs/en/options.html
 * @author: SunSeekerX
 * @Date: 2020-07-20 16:34:25
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-05-25 11:21:47
 */

module.exports = {
  // 行宽 default:80
  printWidth: 120,
  // tab 宽度 default:2
  tabWidth: 2,
  // 使用 tab 键 default:false
  useTabs: false,
  // 语句行末是否添加分号 default:true
  semi: false,
  // 是否使用单引号 default:false
  singleQuote: true,
  // 对象需要引号在加 default:"as-needed"
  quoteProps: 'as-needed',
  // jsx单引号 default:false
  jsxSingleQuote: true,
  // 最后一个对象元素加逗号 default:"es5"
  trailingComma: 'es5',
  // 在对象字面量声明所使用的的花括号后（{）和前（}）输出空格 default:true
  bracketSpacing: true,
  // 将 > 多行 JSX 元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭元素）。default:false
  bracketSameLine: false,
  // (x) => {} 是否要有小括号 default:"always"
  arrowParens: 'always',
  // default:0
  rangeStart: 0,
  // default:Infinity
  rangeEnd: Infinity,
  // default:false
  insertPragma: false,
  // default:false
  requirePragma: false,
  // 不包装 markdown text default:"preserve"
  proseWrap: 'preserve',
  // HTML空白敏感性 default:"css"
  htmlWhitespaceSensitivity: 'strict',
  // 在 *.vue 文件中 Script 和 Style 标签内的代码是否缩进 default:false
  vueIndentScriptAndStyle: false,
  // 末尾换行符 default:"lf"
  endOfLine: 'auto',
}
