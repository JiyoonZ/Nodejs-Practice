const { Schema } = require('mongoose');
const shortId  = require('./types/short-id');

// 콜렉션 스키마 구성하기
const PostSchema = new Schema({
  //shortId 추가하기
  shortId,
  title: {
    type:String,
    required: true,
  },
  content: {
    type:String,
    required: true,
  },
  author: {
    type:String,
    default: '작성자',
  }
}, {
  timestamps: true,
})

module.exports = PostSchema;