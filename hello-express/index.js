const express = require('express');

const app = express();

// 오류처리 미들웨어 1
app.use((req,res,next) => {
  if(!isAdmin(req)) {
    next(new Error('Not Authorized'));
    return;
  }
  next();
})


app.get('/', (req,res,next)=> {
  res.send('Hello Express');
})

// 오류처리 미들웨어 2
app.use((err,req,res,next) => {
  res.send('Error Occurred')
})

//함수형 미들웨어
const auth = (memberType) => {
  return (req,res,next) => {
    if(!checkMember(req, memberType)) {
      next(new Error('member not ${member Type'));
      return;
    }
    next();
  }
}
const auth1 =(memberType) => (req, res, next) => {
  if(!checkMember(req,memberType)) {
    next(new Error('member not ${member Type'));
      return;
  }
  next();
}

app.use('/admin', auth('admin'), adminRouter);
app.use('/users', auth('member'), userRouter);