export default function validate (target, dataType) {
  switch (typeof target) {
    case 'object':
      return validateJSON(target)
    case 'string':
      return validateString(target)
    case 'number':
      return validateString((target).toString())
  }
  function validateJSON (object) {
    // 如果 dataType 的数据类型不正确，就返回错误提示
    if (typeof dataType !== 'object' || Array.isArray(dataType)) {
      console.warn('dataType error! The dataType of variable -- dataType is not object')
      return
    }

    if ((object === undefined) || (object === null)) {
      return [false, '表单未填写完全']
    }

    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        var value = object[key]
        if (validateString(value)[0] === false) {
          console.log('表单有误')
          return [false, '表单有误', {key: value}]
        }
      }
    }
    return [true, '表单正确']
  }
  function validateString (str) {
    if (str === '') {
      return [false, '该项未填写']
    }
    // 如果没有定义 dataType，就不进入数据的合法性效验流程
    if (dataType === undefined) {
      return [true]
    }
    // 如果 dataType 的数据类型不正确，就返回错误提示
    if (typeof dataType !== 'string') {
      console.warn('dataType error! The dataType of variable -- dataType is not string')
      return
    }
    // 根据 dataType 所定义的数据类型，对数据进行合法性效验
    switch (dataType) {
      case 'money':
        if (str.slice(0, 1) === '0') {
          return [false, '请输入正确的数值']
        } else {
          return [true]
        }
      case 'mobilePhoneNumber':
        let length = str.length
        let mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/
        return [(length === 11 && mobile.test(str)), '请输入正确的手机号码']
    }
  }
}
