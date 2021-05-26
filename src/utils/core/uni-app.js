/**
 * @name 获取主题模式
 */
export function getUIStyle() {
  return plus.navigator.getUIStyle()
}

/**
 * @param { String } msg 需要显示的消息
 * @param { Object } options 配置,同uni-app官网
 */
export function toast(msg, options) {
  uni.showToast(
    Object.assign(
      {
        icon: 'none',
        title: msg,
        duration: 2000,
      },
      options
    )
  )
}

// 是否正在跳转
let _isRouting = false
/**
 * @name uni-app 路由封装
 * @param { Object } options
 * @returns void
 */
export function router(options = {}) {
  if (_isRouting) {
    return
  }
  // 正在跳转
  _isRouting = true
  const _config = {
    // 页面路径
    url: '',
    // 跳转类型
    type: 'navigateTo',
    // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
    delta: 1,
    // 窗口显示的动画效果
    animationType: 'pop-in',
    // 窗口动画持续时间，单位为 ms
    animationDuration: 300,
    // 接口调用成功的回调函数
    // success() {},
    // 接口调用失败的回调函数
    fail(e) {
      console.warn(e)
    },
    // 接口调用结束的回调函数（调用成功、失败都会执行）
    complete() {
      _isRouting = false
    },
  }

  // 合并参数
  Object.assign(_config, options)

  const { url, animationType, animationDuration, fail, complete, delta, type } = _config

  switch (type) {
    case 'navigateTo':
      // 保留当前页面，跳转到应用内的某个页面
      uni.navigateTo({
        url,
        animationType,
        animationDuration,
        fail,
        complete,
      })
      break

    case 'redirectTo':
      // 关闭当前页面，跳转到应用内的某个页面
      uni.redirectTo({
        url,
        fail,
        complete,
      })
      break

    case 'reLaunch':
      // 关闭所有页面，打开到应用内的某个页面
      uni.reLaunch({
        url,
        fail,
        complete,
      })
      break

    case 'switchTab':
      // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
      uni.switchTab({
        url,
        fail,
        complete,
      })
      break

    case 'navigateBack':
      // 关闭当前页面，返回上一页面或多级页面
      uni.navigateBack({
        delta,
        animationDuration,
        fail,
        complete,
      })
      break

    default:
      break
  }
}

/**
 * @name 复制文字
 * @param {String} text
 */
export function copy(value) {
  // #ifndef H5
  uni.setClipboardData({
    data: String(value),
    complete() {
      uni.hideToast()
    },
  })
  // #endif

  /**
   * H5 实现
   */
  // #ifdef H5
  const s = document.createElement('input')
  s.value = value
  document.body.appendChild(s)
  s.select()

  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    s.contentEditable = 'true'
    s.readOnly = false
    const range = document.createRange()
    range.selectNodeContents(s)
    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
    s.setSelectionRange(0, 999999)
  }

  try {
    document.execCommand('copy')
    console.warn('Copied Success!')
  } catch (err) {
    console.warn('Copy error!')
  }
  s.remove()
  // #endif
}

/**
 * 打开链接
 * @param { String } url 要跳转的地址
 * @param { Object } options 配置
 */
export function openUrl(
  url,
  options = {
    h5Inside: false,
    appInside: true,
  }
) {
  const { h5Inside = false, appInside = true } = options
  const encodeUrl = encodeURI(decodeURIComponent(url))
  // #ifdef APP-PLUS
  if (appInside) {
    plus.runtime.openWeb(encodeUrl)
  } else {
    plus.runtime.openURL(encodeUrl)
  }
  // #endif

  // #ifdef H5
  if (h5Inside) {
    window.open(encodeUrl)
  } else {
    window.open(encodeUrl, 'target', '')
  }
  // #endif
}
