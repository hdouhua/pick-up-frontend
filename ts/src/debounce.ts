const debounce = <T extends Function, U, V extends any[]>(func: T, wait: number = 0) => {
  let timeout: number | null = null
  let args: V
  function debounced(...arg: V): Promise<U> {
    args = arg
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    // 以 Promise 的形式返回函数执行结果
    return new Promise((res, rej) => {
      timeout = setTimeout(async () => {
        try {
          const result: U = await func.apply(this, args)
          res(result)
        } catch (e) {
          rej(e)
        }
      }, wait)
    })
  }
  // 允许取消
  function cancel() {
    clearTimeout(timeout)
    timeout = null
  }
  // 允许立即执行
  function flush(): U {
    cancel()
    return func.apply(this, args)
  }
  debounced.cancel = cancel
  debounced.flush = flush
  return debounced
}
