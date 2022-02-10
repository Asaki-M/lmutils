[TOC]



## 简介

**@qinghuanaa/lmutils**是一个简单易上手的`js`工具库，将一些常见业务的逻辑封装起来，开箱即用。

> **@qinghuanaa/lmutils**遵循 MIT 开源协议发布，GitHub 地址：

## 安装

---

```
yarn add @qinghuanaa/lmutils

--- or ---

npm i @qinghuanaa/lmutils
```

## 使用

---

```js
// 全部导入
// import lmutils from '@qinghuanaa/lmutils'
import _ from '@qinghuanaa/lmutils'

// 部分导入
import { lm_copy, lm_getdayago } from '@qinghuanaa/lmutils'

lm_copy('text')
// lmutils.lm_copy('text')
_.lm_copy('text')
```

## API 说明

---

### lm_copy

描述：传入一个`string`类型的参数，将其复制到操作系统中的剪切板

语法：

```js
lm_copy(text)
```

参数：

`text`(String)：需要复制的文本内容

示例：

```js
document.getElementById('copybtn').addEventListener('click', () => {
  lm_copy('123')
})
```

### lm_getdayago

描述：计算时间为刚刚、几分钟前、几小时前、几天前

语法：

```js
lm_getdayago(date, now)
```

参数：

`date`(number | Date)：传入一个毫秒级别的时间单位或者一个`Date`对象时间单位

`now`(number | Date)：可选参数，默认值为`Date.now()`，传入一个当前时间单位用以计算`date`到`now`为什么时间

返回值：

返回一个`string`类型的字符串，说明计算时间为刚刚、几分钟前、几小时前、几天前

示例：

```js
console.log(_.lm_getdayago(new Date('2022-1-26'))) // 1天前
console.log(_.lm_getdayago(1643264880000, 1643265074194)) // 3分钟前
```

### lm_formatdate

描述：返回一个指定格式的时间字符串

语法：

```js
lm_formatdate(date, format)
```

参数：

`date`(number | Date)：传入一个毫秒级别的时间单位或者一个`Date`对象时间单位

format(string)：传入一个指定格式的字符串，仅支持`'yyyy-MM-dd hh:mm:ss' || 'yyyy/MM/dd hh:mm:ss' || 'yyyy-MM-dd' || 'yyyy.MM.dd' || 'yyyy/MM/dd' || 'hh:mm:ss' || 'hh:mm'`等多个格式

返回值：

返回一个格式化后的时间字符串

示例：

```js
// 2022-01-27 13:05:04
console.log(
  _.lm_formatdate(new Date('2022-1-27 13:05:04'), 'yyyy-MM-dd hh:mm:ss')
)
// 2022/01/27
console.log(_.lm_formatdate(new Date('2022-1-27 13:05:04'), 'yyyy/MM/dd'))
// 13:05
console.log(_.lm_formatdate(new Date('2022-1-27 13:05:04'), 'hh:mm'))
```

### lm_download

描述：通过传入`url`地址将文件下载到本地

语法：

```js
lm_download(url, name)
```

参数：

`url`(string)：传入一个字符串地址，可以是`项目文件url | 本站或第三方网站url | blob地址 | base64`，需要注意的是传入 blob 地址时，name 为必选参数

`name`(string)：可选参数，传入下载文件的名字，若不传默认为 default 文件名

示例：

```js
lm_download(
  'https://92bb2db0-778c-11ec-997e-198ad526592c.oss-cn-guangzhou.aliyuncs.com/95244600_p0.jpg'
)

lm_download(
  'blob:http://127.0.0.1:5500/53121d4c-412b-4359-9a22-816da32b9599',
  '1.jpg'
)

lm_download('/dist/index.js', 'index.js')
```

### lm_filetobase64

描述：将一个 file 或者 blob 对象转成一个 base64 地址

语法：

```js
lm_filetobase64(file, callback)
```

参数：

`file`(File | Blob)：File 或者 Blob 类型对象

`callback`(Function)：传入一个回调函数，用于接受转换 base64 后的字符串

示例：

```js
lm_filetobase64(file, (data) => {
  console.log(data)
})
```

### lm_base64tofile

描述：将一个 base64 字符串转换成 File 对象

语法：

```js
lm_base64tofile(url, name)
```

参数：

`url`(string)：一个 base64 字符串

`name`(string)：返回 File 对象的 name 属性

返回值：

返回一个 File 对象

示例：

```js
const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAADFoAABEk......'
console.log(lm_base64tofile(base64, 'button'))
```
