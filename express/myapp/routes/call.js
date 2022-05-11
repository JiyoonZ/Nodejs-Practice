const express = require('express');
const router = express.Router();

router.get('/', (req,res, next)=> {
  res.send(`hello express
  <a href="/test/member">멤버부르기</a>`);
  //응답할때 한번에 해야된다...
  // res.send('<a href="/test/member">멤버부르기</a>');
});

router.get('/member',(req,res) => {
  console.log('memberCall');
  res.send("call member<br>도메인 뒤에 id입력 <br>예> /test/member/zeeyoon")
})
// 하나로 이름을 통일하는것이 협업시 좋다.
router.get('/member/:id', (req,res) => {
  const member = req.params.id;
  console.log(member);
  res.send(`${member}입니다!!`)
})
// API 문서.
// 함수
// post   url/test/member/:id ====>  회원의 id로 한다. 회원의 DB key로한다.


module.exports = router;
