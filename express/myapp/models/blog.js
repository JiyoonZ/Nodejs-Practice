const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const blogSchema = mongoose.Schema;

//블로그 =>  글제목, 글내용
//auto-increment
autoIncrement.initialize(mongoose);
const blog = new blogSchema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  no: Number,
},{
    timestamps: true
})
// 위에서 만든 스키마에 plugin 으로 
// autoIncrement.plugin 을 사용하겠다.
blog.plugin(autoIncrement.plugin, {
  model: 'blog', //우리가 사용할 모델(스키마)
  field: 'no', //어떤 필드에서 쓸것인지
  startAt: 10, //시작
  incrementBy: 1, //하나씩 증가시키겠다. 
});
const blogModel = mongoose.model('blog', blog);
module.exports = blogModel;