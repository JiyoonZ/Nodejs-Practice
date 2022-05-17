const { Router } = require('express');
const router = Router();

router.get('/', (req,res) => {
  res.render('board/list',{title:'Posts 시작하기!'});
})

module.exports = router;