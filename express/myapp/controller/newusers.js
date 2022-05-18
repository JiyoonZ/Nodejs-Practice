const userSchema = require('../models/newuser');
const bcrypt = require('bcrypt');
const {body, validationResult} = require('express-validator')

// 회원가입 메인페이지 렌더링하기
const userAuth = (req,res,next)=> {
  res.render('blog/auth');
};

// ================   회원가입 인증하기 ==================
//넘어온 email 이 email의 형식을 가지고 있는지 체크
const checkEmail = body('email')
  .isEmail()
  .withMessage('아이디는 email 형태를 따르지 않습니다.');
// 넘어온 password 가 최소 5자 미만인지
const checkPwd = body('password')
  .isLength({min:5})
  .withMessage('비밀번호는 최소 5글자 입니다.');

// 위의 두개체크사항을 끝내면 클라이언트에 보낼 응답 작성
const userSignup = async (req,res) => {
  // 넘어오는 값. (post로)
  // id:이메일 , 비번(5자)
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if(!errors.isEmpty()) { // 에러가 비어져 있지 않다! 즉 에러가 있다! 
    return res.status(400).json({
      errors: errors.array()
    })
  }

  // 중복 가입 . 찾기 쿼리
  const findresults = await userSchema.findOne({email:email});

  if(!findresults) {   // 결과가 X => 신규 가입
    // 암호화를 할때 기준이 되는 메세지의 길이가 존재
    const salt = bcrypt.genSaltSync(10)
    // 받은 패스워드를 위에서 만든 메세지길이 기준으로 암호화하여 bcryptpw에 답겠다.
    const bcryptpw = bcrypt.hashSync(password, salt)
    userSchema.create({
      email: email,
      password: bcryptpw
    }).then (result => {
      res.status(200).json(result);
    })

  } else { // 결과가 존재 => 중복으로 가입이 되어 있는 경우
      res.status(200).json({msg: "이미 가입이 완료된 계정입니다."});
  }
  // SNS로그인.
  // 이메일 인증 등을 추가적으로 거친다.
  // passport 라는 패키지 사용 
}
//  ====================================

//로그인 페이지 렌더
const loginPage = (req,res) => {
  res.render('blog/login');
}

// 로그인 관련
const login = async (req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  //가입을 했던 유저인지? 아닌지? 
  const userdata = await userSchema.findOne({email:email}).exec();

  if(!userdata) { //데이터가 없다면 => 가입한 회원이 아니라면 
    
    return res.status(401).json({msg: '가입되지 않은 계정입니다.'});

  } else { //유저 데이터가 존재한다면 => 비밀번호 매칭 확인하기! 
    // compareSync(비교할패스워드 , DB에 있는 패스워드)
    const pwMatch = bcrypt.compareSync(password,userdata.password);
    if(pwMatch) {
      res.status(200).json({msg:'OK'})
    } else {
      res.status(401).json({msg: '비밀번호가 일치하지 않습니다. '})
    }
  }
}

// 쿠키와 세션
// 로그인 => id:abcd.
// 쿠키 ==> 사용자의 브라우저에 저장 데이터 모음
// 세션 ==> 서버쪽에 저장하는 데이터 모음
const cookie = (req,res) => {
  // "key-변수-이름" "value-s내가 저장하고 싶은 값"
  res.cookie('drink','water');
  res.send('set cookie');
}


module.exports = {
  userAuth,
  checkEmail,
  checkPwd,
  userSignup,
  login,
  loginPage,
  cookie,
}