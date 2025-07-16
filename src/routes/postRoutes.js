import express from 'express';
const postRouter = express.Router();

const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now());
    next();
}
postRouter.use(timeLog);

postRouter.get('/', (req, res) => {
    res.send('hello post');
});
postRouter.get('/:id', (req, res) => {
    res.send('hello post id');
});
postRouter.put('/:id', (req, res) => {
    res.send('edit post');
});
postRouter.post('/:id', (req, res) => {
    res.send('create post');
});
postRouter.delete('/:id', (req, res) => {
    res.send('delete post');
});

export default postRouter;
