var express = require('express');
const userController = require('../controller/newusers');
const session = require('express-session');
const parseurl = require('parseurl');

var router = express.Router();
/* GET users listing. */
//회원가입 메인페이지
router.get('/', userController.userAuth);
// 가입시 입력한값 받아오기
router.post('/signup',
  //체크후 userSignup 미들웨어에서 오류처리/중복검사/데이터(저장) 모두실행 
  userController.checkEmail,
  userController.checkPwd,
  userController.userSignup
);
// 로그인 하기 페이지
router.get('/login', userController.loginPage)
// 로그인 하기
router.post('/login',userController.login)
// 쿠키
router.get('/cookie', userController.cookie);
// 세션
// router 구간에서만 사용 가능하게끔 만들어짐
// 프로젝트 전체 전역으로 사용하려면 어떻게 해야할지 고민해보기 
router.use(
  session({
    secret: "12345",
    resave: false,
    saveUninitialized: true
  })
);
router.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {}
  }
  // blog/name 이런 url 주소
  // get the url pathname
  var pathname = parseurl(req).pathname
  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
  next()
})
router.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

module.exports = router;
