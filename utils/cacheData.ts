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

export function getCacheData(path) {
  let data = {}
  if (path != 'make') {
    data = {
      callbackUrl: ''
    }
  } else if (path == 'make') {
    data = {
      category: '增值税电子普通发票',
      outOrderNo: 'TOOL' + new Date().getTime(),
      purchaserName: '深圳市腾讯计算机系统有限公司',
      purchaserTaxpayerNumber: '91440300708461136T',
      purchaserAddress: '',
      purchaserPhone: '',
      purchaserBank: '',
      purchaserBankAccount: '',
      sellerName: '无锡帮趣数据服务有限公司',
      sellerTaxpayerNumber: '91320211MA1WML8X6T',
      sellerAddress: '无锡市滨湖区吟白路1号超级计算无锡中心6楼',
      sellerPhone: '0510-85180020',
      sellerBank: '建设银行无锡滨湖支行',
      sellerBankAccount: '32050161483600001096',
      receiverName: '',
      checkerName: '',
      drawerName: '',
      mobile: '',
      email: '',
      remark: '',
      callbackUrl: '',
      webSocket: '',
      topic: '',
      message: '',
      items: [
        {
          no: '',
          name: '',
          model: '',
          unit: '',
          number: null,
          price: null,
          sum: null,
          discount: 0,
          taxRate: null,
          preferentialPolicyFlag: '',
          zeroRateFlag: '',
          preferentialPolicyName: ''
        }
      ]
    }
  }

  let arr = localStorage.getItem('cacheData') ? JSON.parse(localStorage.getItem('cacheData')) : []
  arr.forEach(item => {
    if (item.path == path) {
      data = item.formData
    }
  })
  return data
}
