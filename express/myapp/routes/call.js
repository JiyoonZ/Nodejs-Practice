const express = require('express');
const router = express.Router();

router.get('/', (req,res, next)=> {
  res.send('hello express');
});

router.get('/member',(req,res) => {
  console.log('memberCall');
  res.send("call member")
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
