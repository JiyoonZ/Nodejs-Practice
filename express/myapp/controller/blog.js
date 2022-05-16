const blogSchema = require('../models/blog');

//블로그 메인 페이지
const blogindex = async (req,res) => {
  const result = await blogSchema.find({}).exec();
  res.render('blog/blog',{content: result});
};

// 글쓰기 페이지 렌더링
const blogwrite = (req,res)=> {
  res.render('blog/write');
};

// 글 포스트해서 DB에 저장하기
const blogpost = (req,res,next) => {
  const title = req.body.title;
  const content = req.body.content;
  const blogData = new blogSchema({
    title:title,
    content:content,
  });
  blogData.save()
    .then(result => {
    console.log(result);
    res.redirect('/blog');
  })
    .catch(err => {
      console.log(err);
      next(err);
    });
}

module.exports = {
  blogindex,
  blogwrite,
  blogpost
}