
export default function formatMoney (number, unit = '元', unitOfOutput = '元') {
// input: [number, unitOfThisNumber, unitOfExpectedOutputNumber]
//   typeof number === 'number' || 'string'
// output: {number, unit}

  if (unit === '元' || 'RMB' || '人民币') {
    switch (unitOfOutput) {
      case '万':
        number = parseInt(number).toString().slice(0, -4)
        return new Money(number, unitOfOutput)
      case '元':
        number = parseInt(number).toString()
        return new Money(number, unitOfOutput)
    }
  }

  if (unit === 'dollar' || '$' || '美元') {

  }
  // formatMoney('100000.0', '元', '万')
}

export function Money (number, unit) {
  // typeof number === 'string'
  // typeof unit === 'string'
  this.number = number
  this.unit = unit
  this.toString = function (separator = ',') {
    // input format: a Money object
    // output format: a string
    var str = ''
    var arr = this.number.split('')
    arr.forEach((element, index) => {
      str = str + element
      if ((arr.length - index + 1) % 3 === 2) {
        str = str + separator
      }
    })
    if (str.endsWith(separator)) {
      str = str.slice(0, -1)
    }
    return (str + unit)
  }
  Object.defineProperty(this, 'toString', {
    enumerable: false
  })
  return this
  // let money = new Money('10000', '元')
  // money
}
