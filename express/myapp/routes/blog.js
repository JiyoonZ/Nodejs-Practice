const express = require('express');
const blogController = require('../controller/blog');
const router = express.Router();

//블로그 메인
router.get('/',blogController.blogindex)
//블로그 글쓰기
router.get('/write', blogController.blogwrite)
// 쓴내용 DB에 보내주기
router.post('/write',blogController.blogpost)

module.exports = router;