const express = require('express');
require('dotenv').config();
const app = express();

//요청을 받았을때 보내주기
app.get('', (req,res)=> {
  res.send('<h1>Hello World!</h1>')
})
// env 파일에 따로 저장한 이유 
// 코드를 봐도 어떤 코드로 돌리는지 모르기 때문에 보안적으로 안전 

app.listen(process.env.PORT, ()=> {
  console.log(`Server is running on port ${process.env.PORT}`);
})