import express from 'express';
const userRouter = express.Router();

const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now());
    next();
}
userRouter.use(timeLog);

userRouter.get('/', (req, res) => {
    res.send('hello post');
});
userRouter.get('/:id', (req, res) => {
    res.send('hello post id');
});
userRouter.put('/:id', (req, res) => {
    res.send('edit post');
});
userRouter.post('/:id', (req, res) => {
    res.send('create post');
});
userRouter.delete('/:id', (req, res) => {
    res.send('delete post');
});

export default userRouter;
