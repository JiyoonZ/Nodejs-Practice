const express = require('express');
const app = express();
const notesRouter = require('./routes/notes');
// 기본적으로 HTTP body 에 전달되는 JSON 데이터 처리 못하기 때문
// generator 로 프로젝트 생성히 자동으로 적혀져있음..
app.use(express.json());

app.use('/notes', notesRouter);

// 오류처리 미들웨어
// 모든 라우팅에 공통적으로 적용 
app.use((err,req,res,next)=> {
  res.status(500);

  res.json({
    result: 'fail',
    error: err.message,
  })
})

// 정의되지 않은 라우팅에 404 오류 처리하기
// 모든 라우팅이 적용된 이후 -> 설정된 경로가 없는 요청을 처리
app.use((req,res, next)=> {
  res.status(404);
  res.send({
    result: 'fail',
    error: `Page not founc ${req.path}`
  })
})

app.listen(3000);