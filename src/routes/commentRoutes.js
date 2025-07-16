import express from 'express';
const commentRouter = express.Router();

commentRouter.get('/', (req, res) => {
    res.send('hello post');
});
commentRouter.get('/:id', (req, res) => {
    res.send('hello post id');
});
commentRouter.put('/:id', (req, res) => {
    res.send('edit post');
});
commentRouter.post('/', (req, res) => {
    res.send('create post');
});
commentRouter.delete('/:id', (req, res) => {
    res.send('delete post');
});

export default commentRouter;
