const blogSchema = require('../models/blog');

//블로그 메인 페이지
const blogindex = async (req,res) => {
  const result = await blogSchema.find({}).exec();
  res.render('blog/blog',{content: result});
};
//블로그 상세글보기 
const blogread = async(req,res) => {
  const blogNum = Number(req.params.id);
  const result = await blogSchema.findOne({no:blogNum}).exec();
  res.render('blog/view',{content: result});
}

// 글쓰기 페이지 렌더링
const blogwrite = (req,res)=> {
  res.render('blog/write');
};

//글 삭제하기
const delblog = async (req,res)=> {
  const no = req.params.id;
  const result = await blogSchema.findOneAndDelete({no:no});
  try {
    return res.status(200).json({
      redirect: '/blog' //
    })
  } catch(err) {
    console.log(err);
  }
}

// 글 수정하기 - 기존글 가져오기 
const updateblog = async (req,res)=> {
  const no = req.params.id;
  const result = await blogSchema.findOne({no: no}).exec();
  res.render('blog/edit', {content: result});
}
// 수정된 글 저장하기
const updatewrite = async(req, res)=> {
  const title = req.body.title;
  const content = req.body.content;
  const no = req.params.id;
  
  // findOneAndUpdate({필터}, 수정내용)
  await blogSchema.findOneAndUpdate({no:no}, {
    title:title,
    content: content
  }).exec();
  const filtered = await blogSchema.findOne({no:no}).exec();
  
  res.render('blog/view', {content: filtered});
}

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
  blogpost,
  blogread,
  updateblog,
  delblog,
  updatewrite,
}