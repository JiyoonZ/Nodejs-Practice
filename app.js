//기본실행 파일.
//계산기 작성
const cal = require('./cal');
// console.log(cal.mul2(1,2));
// console.log(cal.sub2(1,2));
// console.log(cal.add2(1,2));
// console.log(cal.str);
// console.log(cal.num);

const func = require('./func');
console.log(func.fn2());
console.log(func.fn2());

//같은 기능을 여러번 중복적으로 활용
for(let i =0; i<10; i++) {
  // console.log(func)
  console.log(func.fn2())
}
