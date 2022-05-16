const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  userId: {
    type:String,
    required: true,
    unique: true, //collection 안에서 유일
  },
  job: {
    type:String,
    required: true,
  },

});
// user 라는 콜렉션에 만든 스키마를 넣고 모델 생성
const userData =mongoose.model('user', user);
module.exports = userData;