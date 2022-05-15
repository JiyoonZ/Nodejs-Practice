const { Router } = require('express');
const Note = require('../models/note');

const router = Router();

// Note 목록 가져오기
router.get('/', (req,res,next)=> {
  const notes = Note.list();
  // json 형식으로 notes객체를 전송하겠다. 
  res.json(notes);
})

// 원하는 id 값의 메모
router.get('/:id', (req,res, next) => {
  const id = Number(req.params.id);
  try {
    const note = Note.get(id);
    res.json(note);
  } catch (e) {
    next(e)
  }
})

// 노트 작성
router.post('/', (req,res,next)=> {
  const { title, content } = req.body;
  const note = Note.create(title, content);
  res.json(note);
})

// 노트 수정하기
router.put('/:id', (req,res,next)=> {
  const id = Number(req.params.id);
  const { title, content } = req.body;

  try {
    const note = Note.update(id,title,content);
    res.json(note);
  } catch (e) {
    next(e)
  }
})

// 노트 삭제하기
router.delete('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  try {
    Note.delete(id)
    res.json({result: "success"});
  } catch (e) {
    next(e);
  }
});

module.exports = router;