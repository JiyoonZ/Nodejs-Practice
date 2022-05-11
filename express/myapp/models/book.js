const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 데이터 형태 만들기 
const book = new Schema({
  bookname: String,
  author : String,
  price: {
    //입력이 안들어오면 기본값 세팅해줄수 있다.
    type:Number,
    default: 5000
  },
  publish : Date,
  sales:{
    type:Boolean,
    default: false,
  }
})
// model() => model('컬렉션이름', data형태구조)
const bookData = mongoose.model('bookinfo',book);
module.exports = bookData;