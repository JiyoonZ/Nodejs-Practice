
const list = document.getElementById('list');
const update = document.getElementById('update');
const del = document.getElementById('delete');

list.addEventListener("click", ()=> {
  location.href = '/blog';
})

// 글 no. 정보찾기
// 그 찾은 정보를 삭제할것
// 목록에서 다시 반영
// router.delete ; router.post;
// 삭제완료 메세지 => 클라이언트에 전달
// 클라이언트 특정 동작을 하도록 => 경로이동 
del.addEventListener("click", ()=> {
  fetch(`http://localhost:3000/blog/delete/${del.dataset.doc}`, {
    method : 'DELETE',
  })
    .then(res=> res.json())
    .then(data => window.location.href=data.redirect)
    .catch(err => console.log(err));
})


// 글 수정하기 
// 기존의 글 값들을 가져오기
// post 전송을 한후에.. 수정하는 함수 코드를 활용. 수정.
// put 을 활용하지 않고 POST를 사용할것임 (PUT은 보안적 이슈등이 있어서...)
update.addEventListener("click", ()=> {
  location.href = `/blog/updateread/${update.dataset.doc}`
})