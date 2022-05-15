// 앞으로 계속 데이터로 사용할 배열
let notes = [
  {
    id:1,
    title: "first note",
    content: "My first note is here"
  }
];

// 배열의 객체를 구조분햏 할당 받을때 모두 프로퍼티 값이 같아야한다.
// id와 title 값만 가진 객체를 list라는 객체에 함수로 내보내기
exports.list = () => {
  return notes.map(({id, title}) => ({
    id, 
    title
  }))
}

// 메모 상세 구현하기
exports.get = (id) => {
  //id를 받아와서 일치하는 노트 찾고 note객체에 저장
  const note = notes.find(
    (note) => note.id === id
  );
  // 해당 id의 note가 없다면 에러메세지
  if(!note) {
    throw new Error('Note not found');
  }
  
  return note;
}

// 메모작성 구현하기
exports.create = (title, content) => {
  // 마지막 노트의 id 값 받아오기 
  // 이름은 lastId로 받아오기
  const {id : lastId} = notes[notes.length -1];
  
  const newNote = {
    id: lastId + 1,
    title,
     content,
  }
  notes.push(newNote);
  return newNote;
}

// 메모 수정하기
exports.update = (id, title, content) => {
  // 노트 목록들에 하나씩 접근하여 id 값이 
  // 인자로 받은 id 값과 동일하면 인덱스를 반환하여 Index에 할당하기 
  const index = notes.findIndex((note) => 
    note.id === id
  );

  if(index<0) {
    throw new Error("Note not found for update");
  }

  // 해당 인데스의 노트 찾기
  // 굳이 복사본을 만드는 이유는 데이터 무결성을 지키려고 
  const note = notes[index];
  note.title = title;
  note.content = content;
  // 얕은 복사지만 어쩃든 원본에 변경사항 잘 반영됨 
  // 그래도 다시 할당해주기..
  notes[index] = note; 
  return note;
}


// 메모삭제하기
exports.delete = (id) => {
  // 각각의 Note id에 인자로 받아오 Id와 일치하는것이 한개라도 있다면 true
  // 없다면 false 
  if(!notes.some((note) => note.id === id)) { //id가 일치하는게 1개도 없다
    throw new Error('Note not found for delete' );
  }
  // note들 중에 id 값이 일치하지 않은 것만 거르기
  // 걸러진 배열을 재할당
  notes = notes.filter(note => note.id !== id);
  return;
}

