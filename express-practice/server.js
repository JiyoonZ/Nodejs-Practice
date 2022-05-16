//환경변수..
require('dotenv').config();
const { MONGO_URI, PORT} = process.env;

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRouter = require('./router/userRouter');
const User = require("./models/users");


// 몽고디피와 연결
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// 받아온 정보들을 json 형태로 받아오겠다
app.use(express.json());
app.use(express.urlencoded({extended: true}))
// user라는 라우터로 사용하겠다. 
app.use("/user", userRouter);

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//기본적으로 우리사이트에 접속했을떄
app.get("", (req, res)=> {
  // user 모델 사용
  User.find({}, (err, users) => {
    if(err) {
      console.log(err);
    } else {
      res.render("index", {users});
    }
  })
})

//요청을 받았을때 보내주기
app.get('', (req,res)=> {
  res.sendFile(__dirname + '/index.html')
})

// env 파일에 따로 저장한 이유 
// 코드를 봐도 어떤 코드로 돌리는지 모르기 때문에 보안적으로 안전 
app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}`);
})