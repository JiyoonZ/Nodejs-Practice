const { Router } = require('express');
const router = Router();

router.get('/', (req,res) => {
  res.render('board/list',{title:'Posts μμνκΈ°!'});
})

module.exports = router;