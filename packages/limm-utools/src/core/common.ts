/**
 * 通用模块
 */

/**
 * 检查一个给定的值是否有效（不为 null,或者 undefined）
 * @param val { unknown } 需要检查的值
 * @returns 检查结果
 */
export function isNil(val: unknown): boolean {
  return val == null
}
