const express = require('express');
const blogController = require('../controller/blog');
const router = express.Router();

//블로그 메인
router.get('/',blogController.blogindex)
//블로그 글쓰기 
router.get('/write', blogController.blogwrite)
//블로그 글쓰기 - 쓴내용 DB에 보내주기
router.post('/write',blogController.blogpost)
// 블로그 상세보기
router.get('/read/:id',blogController.blogread);
// 블로그 삭제하기
router.delete('/delete/:id', blogController.delblog)
// 블로그 수정하기 - 기존의 글값들 가져오기
router.get('/updateread/:id', blogController.updateblog)
// 블로그 수정하기 - 수정한내용 DB에 보내주기
router.post('/updatewrite/:id', blogController.updatewrite)

module.exports = router;