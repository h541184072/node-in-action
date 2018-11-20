function setUp(format) {
  const regexp = /:(\w+)/g
  return function createLogger(req, res, next) {
    const str = format.replace(regexp, (match, property) => {
      return req[property]
    })
    console.log(str)
    next()
  }
}

module.exports = setUp