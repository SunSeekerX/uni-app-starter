/**
 * @name Handle error
 * @author SunSeekerX
 * @time 2019-11-27 15:18:44
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-05-17 23:34:44
 */

import { toast, LogUtil } from './index'
import errCode from './err-code'

/**
 * @name Handle api request exception
 * @description when api request fail, you should using this in your catch block
 * @param { Error } e exception object
 * @returns void
 */
function handleApiRequestException(res) {
  LogUtil.warn('Capture request exception >>>', res)

  if (Object.keys(errCode).includes(res.code)) {
    toast(errCode[res.code])
  } else {
    toast(res.msg)
  }
}

/**
 * @name Handle WebSocket exception
 * @description when WebSocket exception, you should using this in your catch block
 * @param { Error } e exception object
 * @returns void
 */
function handleWebSocketException(e) {
  LogUtil.error(e)
}

/**
 * @name Handle application exception
 * @description when Application exception, you should using this in your catch block
 * @param { Error } e exception object
 * @returns void
 */
function handleApplicationException(e) {
  LogUtil.error(e)
}

/**
 * @name Handle when request result success no true
 * @param { String } msg tips message
 */
function handleRequestFail(res) {
  LogUtil.warn('Capture request fail >>>', res)
  if (Object.keys(errCode).includes(res.code)) {
    toast(errCode[res.code])
  } else {
    toast(res.msg)
  }
}

export {
  // Api请求出错
  handleApiRequestException,
  // WebSocket错误
  handleWebSocketException,
  // 程序出错
  handleApplicationException,
  // 请求失败
  handleRequestFail,
}
