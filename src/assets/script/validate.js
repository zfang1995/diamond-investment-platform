
export default function validate (target, targetRules, targetName) {
  // 验证单项（3个参数）：validate('139666666', ['required', 'phone'], '手机号码')
  // 验证多项（1个参数）: validate({
  //                       mobile: {
  //                         value: '139666666',
  //                         rules: ['required', 'phone'],
  //                         name: '手机号码'
  //                       }
  //                     })
  switch (typeof target) {
    case 'object':
      return validateJSON(target)
    case 'string':
      return validateSingle(target, targetRules, targetName)
    case 'number':
      return validateSingle((target).toString(), targetRules, targetName)
  }
  // 验证多项
  function validateJSON (obj) {
    if (obj === null) {
      return [false, '表单未填写完全']
    }

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let {value, rules, name} = obj[key]
        let result = validateSingle(value, rules, name)
        if (result[0] === false) {
          console.log('表单有误')
          // 验证多项时result添加key value 方便定位
          return result.concat([{key, value}])
        }
      }
    }
    return [true, '表单正确']
  }
  // 验证单项
  function validateSingle (singleValue, singleRules = [], singleName = '') {
    for (let rule of singleRules) {
      if (typeof rule === 'string') {
        rule = {
          type: rule
        }
      }
      switch (rule.type) {
        case 'required':
          if (singleValue) {
            continue
          } else {
            return [false, rule.msg || `请输入${singleName}`]
          }
        case 'money':
          if (/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(singleValue)) {
            continue
          } else {
            return [false, rule.msg || `请输入正确的${singleName}`]
          }
        case 'phone':
          if (/^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/.test(singleValue)) {
            continue
          } else {
            return [false, rule.msg || `请输入正确的${singleName}`]
          }
        case 'number':
          if (/^[0-9]+(.[0-9]+)?$ /.test(singleValue)) {
            continue
          } else {
            return [false, rule.msg || `${singleName}必须是数字`]
          }
        case 'bankCardNumber':
          if (/^([1-9]{1})(\d{14}|\d{18})$/.test(singleValue)) {
            continue
          } else {
            return [false, rule.msg || `请输入正确的${singleName}`]
          }
        case 'password':
          if (singleValue.length < 8) {
            return [false, rule.msg || `${singleName}长度不应少于8位`]
          }
          if (!/\d/.test(singleValue)) {
            return [false, rule.msg || `${singleName}应至少包含一个数字`]
          }
          if (!/[a-z]/.test(singleValue)) {
            return [false, rule.msg || `${singleName}应至少包含一个小写字母`]
          }
          if (!/[A-Z]/.test(singleValue)) {
            return [false, rule.msg || `${singleName}应至少包含一个大写字母`]
          }
          if (/[^0-9a-zA-Z]/.test(singleValue)) {
            return [false, rule.msg || `${singleName}不能包含特殊字符，只能使用使用数字、小写字母、大写字母。`]
          }
          continue
        default:
          console.warn('验证规则未定义', rule)
          return
      }
    }
    return [true, '表单正确']
  }
}
