let humanProperties = {
  readingSpeedInChinese (unit = 'w/s') {
    switch (unit) {
      case 'w/s':
        return 13
      case 'w/minute':
        return 800
    }
  }
}
export default humanProperties
