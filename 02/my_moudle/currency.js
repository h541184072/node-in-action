const canadianDollar = 0.91

function roundTwo(amount) {
  return Math.random(amount * 100) / 100
}

exports.canadianToUs = canadian => roundTwo(canadian * canadianDollar)
exports.UStoCanadian = us => roundTwo(us / canadianDollar)

