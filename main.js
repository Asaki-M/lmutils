function lm_copy(text) {
  if (!text) {
    console.error('text is undefined\nCopy failed.')
    return
  }
  if (typeof text === 'object') {
    console.warn('The parameter cannot be Object!\nCopy failed.')
    return
  }

  if (!window.isSecureContext) {
    console.warn(
      'The current address is not secure, please use HTTPS or localhost'
    )
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
  } else {
    const i = document.createElement('input')
    i.value = text
    document.body.appendChild(i)
    i.select()
    document.execCommand('Copy')
    document.body.removeChild(i)
  }
}

function lm_getdayago(date, now = Date.now()) {
  if (!date) {
    console.error('date is undefined')
    return
  }
  if (
    (date instanceof Date || typeof date === 'number') &&
    (now instanceof Date || typeof now === 'number')
  ) {
    const MIN = 1000 * 60
    const HOUR = MIN * 60
    const DAY = HOUR * 24
    const MONTH = DAY * 30
    const YEAR = MONTH * 12

    now = new Date(now).getTime()
    date = new Date(date).getTime()

    let diffTime = now - date
    if (diffTime < 0) {
      console.error('Check the date parameter or the now parameter is wrong!')
      return 0
    }

    const minCount = diffTime / MIN
    const hourCount = diffTime / HOUR
    const dayCount = diffTime / DAY
    const monthCount = diffTime / MONTH
    const yearCount = diffTime / YEAR

    if (minCount >= 1 && minCount < 60) {
      return `${Math.floor(minCount)}分钟前`
    } else if (hourCount >= 1 && hourCount < 24) {
      return `${Math.floor(hourCount)}小时前`
    } else if (dayCount >= 1 && dayCount < 30) {
      return `${Math.floor(dayCount)}天前`
    } else if (monthCount >= 1 && monthCount <= 12) {
      return `${Math.floor(monthCount)}月前`
    } else if (yearCount >= 1) {
      return `${Math.floor(yearCount)}年前`
    } else {
      return `刚刚`
    }
  } else {
    console.error('The date or now parameter must be Date or Number')
    return 0
  }
}

function lm_formatdate(date, format) {
  if (!date || !format) {
    console.error('date or format is undefined')
    return
  }
  if (typeof format !== 'string') {
    console.error('The format parameter is not String')
    return
  }
  if (
    !(
      format === 'yyyy-MM-dd hh:mm:ss' ||
      format === 'yyyy/MM/dd hh:mm:ss' ||
      format === 'yyyy-MM-dd' ||
      format === 'yyyy.MM.dd' ||
      format === 'yyyy/MM/dd' ||
      format === 'hh:mm:ss' ||
      format === 'hh:mm'
    )
  ) {
    console.error(
      'The format parameter format is incorrect, please check whether the format parameter format is correct'
    )
    return
  }
  if (date instanceof Date || typeof date === 'number') {
    date = new Date(date)
    const yy = date.getFullYear()
    const MM =
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    const hh = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    const mm =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const ss =
      date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()

    let formatDateRst = format

    if (formatDateRst.indexOf('yyyy') !== -1) {
      formatDateRst = formatDateRst.replace('yyyy', yy)
    }
    if (formatDateRst.indexOf('MM') !== -1) {
      formatDateRst = formatDateRst.replace('MM', MM)
    }
    if (formatDateRst.indexOf('dd') !== -1) {
      formatDateRst = formatDateRst.replace('dd', dd)
    }
    if (formatDateRst.indexOf('hh') !== -1) {
      formatDateRst = formatDateRst.replace('hh', hh)
    }
    if (formatDateRst.indexOf('mm') !== -1) {
      formatDateRst = formatDateRst.replace('mm', mm)
    }
    if (formatDateRst.indexOf('ss') !== -1) {
      formatDateRst = formatDateRst.replace('ss', ss)
    }

    return formatDateRst
  } else {
    console.error('The date or now parameter must be Date or Number')
    return 0
  }
}

async function lm_download(url, name = 'default') {
  if (url.indexOf('blob:') !== -1 && name === 'default') {
    console.error(
      'When the url is a blob address, the name cannot be undefined'
    )
    return
  }

  if (!url) {
    console.error('The url parameter is undefined')
    return
  }

  if (typeof url !== 'string') {
    console.error('The url parameter must be a string')
    return
  }

  if (!window.URL) {
    console.warn(
      'This method is not compatible with current browsers\nDownload fail'
    )
    return
  }

  if (typeof name !== 'string') {
    console.error('The name parameter must be a string')
    return
  }

  if (name === 'default') {
    const idx = url.lastIndexOf('.')
    name = name + url.slice(idx)
  }

  const save = document.createElement('a')
  save.setAttribute('download', name)

  if (
    (url.indexOf('base64') === -1 && url.indexOf('data:') === -1) ||
    url.indexOf('blob:') === -1
  ) {
    let r = null
    try {
      r = await fetch(url)
    } catch (err) {
      console.error(
        'This url has been blocked by CORS policy:: No "Access-Control-Allow-Origin" header is present on the requested resource.\nDownload fail'
      )
      return
    }
    let res = await r.blob()
    const blobdata = new Blob([res])
    save.setAttribute('href', window.URL.createObjectURL(blobdata))
    save.click()
  } else {
    save.setAttribute('href', url)
    save.click()
  }
}

function lm_filetobase64(file, callback) {
  if (!file || !callback) {
    console.error(
      'The file parameter or callback parameter cannot be undefined'
    )
    return
  }
  if (!(file instanceof Blob)) {
    console.error('The file parameter must be File or Blob')
    return
  }
  if (typeof callback !== 'function') {
    console.error('The callback parameter must be Function')
    return
  }
  const fr = new FileReader()
  fr.addEventListener('load', async () => {
    callback(fr.result)
  })
  fr.readAsDataURL(file)
}

function lm_base64tofile(url, name) {
  if (typeof url !== 'string') {
    console.error('The url parameter must be string')
    return
  }
  if (typeof name !== 'string') {
    console.error('The name parameter must be string')
    return
  }
  if (!url || url.length === 0) {
    console.error('The url parameter cannot be undefined or ""')
    return
  }
  if (!name || name.length === 0) {
    console.error('The name parameter cannot be undefined or ""')
    return
  }
  if (!window.atob) {
    console.error('The current browser does not support this method')
    return
  }
  const arr = url.split(',')
  const fileType = arr[0].match(/:(.*?);/)[1]
  const decodedData = window.atob(arr[1])

  let len = decodedData.length
  let arrBuffer = new ArrayBuffer(len)

  while (len--) {
    arrBuffer[len] = decodedData.charCodeAt(len)
  }

  return new File([arrBuffer], name, {
    type: fileType
  })
}

export default {
  lm_copy,
  lm_download,
  lm_getdayago,
  lm_formatdate,
  lm_filetobase64,
  lm_base64tofile
}
