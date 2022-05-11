const express = require('express');
const router = express.Router();
//book 몽고DB 예제
const BookSchema = require('../models/book');
//post.ejs 파일에 있는 html 렌더링
router.get('/', (req, res)=> {
  res.render('post');
});

router.post('/', (req,res, next) => {
  const name = req.body.name;
  const phone  = req.body.phone;
  const date = req.body.date;
  // response 응답
  // 웹 통신 방식 1요청 1응답.
  // 1요청 1응답 후에는 통신 종료되는 것이 정상임
  // res.json({name:name, phone:phone, date:date});
  next();
});

// res.redirect ==> 호출한 경로로 재 접근
router.post('/', (req,res) => {
  // 만약 위에 res.json() 을 주석처리 하지않는다면 Error! 
  //위에서 1요청 1응답이 끝나기 때문에 
  // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  res.redirect('/expost');
})

//'/' ==> expost
//'/addbook' => expost/addbook.
router.post('/addbook', (req,res, next) => {
  const bookname = req.body.bookname;
  const author  = req.body.author;
  const price  = req.body.price;
  const date = req.body.publish;
  // response 응답
  // 웹 통신 방식 1요청 1응답.
  // 1요청 1응답 후에는 통신 종료되는 것이 정상임
  // res.json({bookname:bookname, author:author, price:price ,date:date});
  
  //mongo DB에 저장
  let bookData = new BookSchema({
    bookname : bookname,
    author :author,
    price : price,
    publish : date
  });
  bookData.save();
  res.redirect('/expost');
});

//작가로 책정보를 얻는 라우팅 
router.get('/bookinfo/:id', (req,res)=> {
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

  //방법2
  // BookSchema.find({author:authorname}, (err,result) => {
  //   if(result) {
  //     let booklist = '';
  //     for(let i =0; i<result.length; i++) {
  //       booklist += result[i].bookname + '<br>'
  //     }
  //     return res.send(booklist);
  //   } else {
  //     return res.sned('등록된 작가가 없습니다.')
  //   }
  // })

})
router.get('/del',(req,res)=> {
  res.render('delete');
})
//삭제하는 예시
router.delete('/del/:id',(req,res)=> {
  const bookname = req.params.id;
  BookSchema.findOneAndDelete({bookname:bookname})
    .then(result => {
      res.json({redirect:'/expost'});

    }).catch(err => {
      console.log(err);
    })
})


module.exports = router;