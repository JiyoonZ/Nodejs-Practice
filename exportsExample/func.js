// 모듈을 함수형. 함수로써 호출
// let number = 0;
// module.exports = number +=1;

let number = 3;
module.exports.fn2 = () => {
  return number += 1;
}