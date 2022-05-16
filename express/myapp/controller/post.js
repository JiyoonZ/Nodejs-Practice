const BookSchema = require('../models/book');

const addbook =  (req,res, next) => {
  const bookname = req.body.bookname;
  const author  = req.body.author;
  const price  = req.body.price;
  const date = req.body.publish;
  //mongo DB에 저장
  let bookData = new BookSchema({
    bookname : bookname,
    author :author,
    price : price,
    publish : date
  });
  bookData.save();
  res.redirect('/expost');
};


const getbookinfo = (req,res)=> {
  const authorname = req.params.id;
  //방법1
  BookSchema.find({author:authorname})
    .then(result => {
      if(result.length) res.json(result);
      else res.send('등록된 작가가 없습니다.');
    })
    .catch(err => {
      console.log(err);
    })

}

module.exports = { addbook, getbookinfo}