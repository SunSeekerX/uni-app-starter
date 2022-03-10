/**
 * 编码解码相关
 * @author: SunSeekerX
 * @Date: 2021-06-02 17:52:15
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-09-17 17:17:21
 */
/**
 * URL 编码
 * @param val - 需要 URL 编码的内容
 * @returns { string }
 */
export declare function urlEncode(val: string): string
/**
 * URL 解码
 * @param { string } [val=""] - 需要 URL 解码的内容
 * @param { boolean } [url=true] - 是否需要解码为可识别的 url 链接
 * @returns { string }
 */
export declare function urlDecode(val?: string, url?: boolean): string
/**
 * base64 编码
 * @param { string } val - 需要 base64 编码的内容
 * @returns { string }
 */
export declare function base64Encode2String(val: string): string
/**
 * base64 解码
 * @param {string} val - 需要 base64 解码的内容
 * @returns { string }
 */
export declare function base64Decode(val: string): string
