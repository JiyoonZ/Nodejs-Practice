const {nanoid} = require('nanoid');
//스키마 Id 값을 위해 => 랜덤문자열 생성패키지s
const shortId = {
  type: String,
  default: () => {
    return nanoid()
  },
  require: true,
  index:true,
}

module.exports = shortId;