export function setCacheData(path, data) {
  let repeat = false
  let arr = localStorage.getItem('cacheData') ? JSON.parse(localStorage.getItem('cacheData')) : []
  arr.forEach(item => {
    if (item.path == path) {
      repeat = true
      item.formData = data
    }
  })
  if (!repeat) {
    let obj = {
      path: path,
      formData: data
    }
    arr.push(obj)
  }
  localStorage.setItem('cacheData', JSON.stringify(arr))
}

export function getCacheData(path, data) {
  let obj = {}
  let arr = localStorage.getItem('cacheData') ? JSON.parse(localStorage.getItem('cacheData')) : []
  arr.forEach(item => {
    if (item.path == path) {
      obj = item.formData
    }
  })
  return obj
}
