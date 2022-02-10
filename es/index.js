function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function lm_copy(text) {
  if (!text) {
    console.error('text is undefined\nCopy failed.');
    return;
  }

  if (_typeof(text) === 'object') {
    console.warn('The parameter cannot be Object!\nCopy failed.');
    return;
  }

  if (!window.isSecureContext) {
    console.warn('The current address is not secure, please use HTTPS or localhost');
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text);
  } else {
    var i = document.createElement('input');
    i.value = text;
    document.body.appendChild(i);
    i.select();
    document.execCommand('Copy');
    document.body.removeChild(i);
  }
}

function lm_getdayago(date) {
  var now = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Date.now();

  if (!date) {
    console.error('date is undefined');
    return;
  }

  if ((date instanceof Date || typeof date === 'number') && (now instanceof Date || typeof now === 'number')) {
    var MIN = 1000 * 60;
    var HOUR = MIN * 60;
    var DAY = HOUR * 24;
    var MONTH = DAY * 30;
    var YEAR = MONTH * 12;
    now = new Date(now).getTime();
    date = new Date(date).getTime();
    var diffTime = now - date;

    if (diffTime < 0) {
      console.error('Check the date parameter or the now parameter is wrong!');
      return 0;
    }

    var minCount = diffTime / MIN;
    var hourCount = diffTime / HOUR;
    var dayCount = diffTime / DAY;
    var monthCount = diffTime / MONTH;
    var yearCount = diffTime / YEAR;

    if (minCount >= 1 && minCount < 60) {
      return "".concat(Math.floor(minCount), "\u5206\u949F\u524D");
    } else if (hourCount >= 1 && hourCount < 24) {
      return "".concat(Math.floor(hourCount), "\u5C0F\u65F6\u524D");
    } else if (dayCount >= 1 && dayCount < 30) {
      return "".concat(Math.floor(dayCount), "\u5929\u524D");
    } else if (monthCount >= 1 && monthCount <= 12) {
      return "".concat(Math.floor(monthCount), "\u6708\u524D");
    } else if (yearCount >= 1) {
      return "".concat(Math.floor(yearCount), "\u5E74\u524D");
    } else {
      return "\u521A\u521A";
    }
  } else {
    console.error('The date or now parameter must be Date or Number');
    return 0;
  }
}

function lm_formatdate(date, format) {
  if (!date || !format) {
    console.error('date or format is undefined');
    return;
  }

  if (typeof format !== 'string') {
    console.error('The format parameter is not String');
    return;
  }

  if (!(format === 'yyyy-MM-dd hh:mm:ss' || format === 'yyyy/MM/dd hh:mm:ss' || format === 'yyyy-MM-dd' || format === 'yyyy.MM.dd' || format === 'yyyy/MM/dd' || format === 'hh:mm:ss' || format === 'hh:mm')) {
    console.error('The format parameter format is incorrect, please check whether the format parameter format is correct');
    return;
  }

  if (date instanceof Date || typeof date === 'number') {
    date = new Date(date);
    var yy = date.getFullYear();
    var MM = date.getMonth() + 1 < 10 ? "0".concat(date.getMonth() + 1) : date.getMonth() + 1;
    var dd = date.getDate() < 10 ? "0".concat(date.getDate()) : date.getDate();
    var hh = date.getHours() < 10 ? "0".concat(date.getHours()) : date.getHours();
    var mm = date.getMinutes() < 10 ? "0".concat(date.getMinutes()) : date.getMinutes();
    var ss = date.getSeconds() < 10 ? "0".concat(date.getSeconds()) : date.getSeconds();
    var formatDateRst = format;

    if (formatDateRst.indexOf('yyyy') !== -1) {
      formatDateRst = formatDateRst.replace('yyyy', yy);
    }

    if (formatDateRst.indexOf('MM') !== -1) {
      formatDateRst = formatDateRst.replace('MM', MM);
    }

    if (formatDateRst.indexOf('dd') !== -1) {
      formatDateRst = formatDateRst.replace('dd', dd);
    }

    if (formatDateRst.indexOf('hh') !== -1) {
      formatDateRst = formatDateRst.replace('hh', hh);
    }

    if (formatDateRst.indexOf('mm') !== -1) {
      formatDateRst = formatDateRst.replace('mm', mm);
    }

    if (formatDateRst.indexOf('ss') !== -1) {
      formatDateRst = formatDateRst.replace('ss', ss);
    }

    return formatDateRst;
  } else {
    console.error('The date or now parameter must be Date or Number');
    return 0;
  }
}

function lm_download(_x) {
  return _lm_download.apply(this, arguments);
}

function _lm_download() {
  _lm_download = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
    var name,
        idx,
        save,
        r,
        res,
        blobdata,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            name = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 'default';

            if (!(url.indexOf('blob:') !== -1 && name === 'default')) {
              _context2.next = 4;
              break;
            }

            console.error('When the url is a blob address, the name cannot be undefined');
            return _context2.abrupt("return");

          case 4:
            if (url) {
              _context2.next = 7;
              break;
            }

            console.error('The url parameter is undefined');
            return _context2.abrupt("return");

          case 7:
            if (!(typeof url !== 'string')) {
              _context2.next = 10;
              break;
            }

            console.error('The url parameter must be a string');
            return _context2.abrupt("return");

          case 10:
            if (window.URL) {
              _context2.next = 13;
              break;
            }

            console.warn('This method is not compatible with current browsers\nDownload fail');
            return _context2.abrupt("return");

          case 13:
            if (!(typeof name !== 'string')) {
              _context2.next = 16;
              break;
            }

            console.error('The name parameter must be a string');
            return _context2.abrupt("return");

          case 16:
            if (name === 'default') {
              idx = url.lastIndexOf('.');
              name = name + url.slice(idx);
            }

            save = document.createElement('a');
            save.setAttribute('download', name);

            if (!(url.indexOf('base64') === -1 && url.indexOf('data:') === -1 || url.indexOf('blob:') === -1)) {
              _context2.next = 39;
              break;
            }

            r = null;
            _context2.prev = 21;
            _context2.next = 24;
            return fetch(url);

          case 24:
            r = _context2.sent;
            _context2.next = 31;
            break;

          case 27:
            _context2.prev = 27;
            _context2.t0 = _context2["catch"](21);
            console.error('This url has been blocked by CORS policy:: No "Access-Control-Allow-Origin" header is present on the requested resource.\nDownload fail');
            return _context2.abrupt("return");

          case 31:
            _context2.next = 33;
            return r.blob();

          case 33:
            res = _context2.sent;
            blobdata = new Blob([res]);
            save.setAttribute('href', window.URL.createObjectURL(blobdata));
            save.click();
            _context2.next = 41;
            break;

          case 39:
            save.setAttribute('href', url);
            save.click();

          case 41:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[21, 27]]);
  }));
  return _lm_download.apply(this, arguments);
}

function lm_filetobase64(file, callback) {
  if (!file || !callback) {
    console.error('The file parameter or callback parameter cannot be undefined');
    return;
  }

  if (!(file instanceof Blob)) {
    console.error('The file parameter must be File or Blob');
    return;
  }

  if (typeof callback !== 'function') {
    console.error('The callback parameter must be Function');
    return;
  }

  var fr = new FileReader();
  fr.addEventListener('load', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            callback(fr.result);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  fr.readAsDataURL(file);
}

function lm_base64tofile(url, name) {
  if (typeof url !== 'string') {
    console.error('The url parameter must be string');
    return;
  }

  if (typeof name !== 'string') {
    console.error('The name parameter must be string');
    return;
  }

  if (!url || url.length === 0) {
    console.error('The url parameter cannot be undefined or ""');
    return;
  }

  if (!name || name.length === 0) {
    console.error('The name parameter cannot be undefined or ""');
    return;
  }

  if (!window.atob) {
    console.error('The current browser does not support this method');
    return;
  }

  var arr = url.split(',');
  var fileType = arr[0].match(/:(.*?);/)[1];
  var decodedData = window.atob(arr[1]);
  var len = decodedData.length;
  var arrBuffer = new ArrayBuffer(len);

  while (len--) {
    arrBuffer[len] = decodedData.charCodeAt(len);
  }

  return new File([arrBuffer], name, {
    type: fileType
  });
}

var index = {
  lm_copy: lm_copy,
  lm_download: lm_download,
  lm_getdayago: lm_getdayago,
  lm_formatdate: lm_formatdate,
  lm_filetobase64: lm_filetobase64,
  lm_base64tofile: lm_base64tofile
};

export { index as default };
