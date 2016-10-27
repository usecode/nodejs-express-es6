import express from 'express';
let app = express();

//middleware
app.use((request, response, next) => {
    console.log(request.headers);
    next();
});

//router
app.get('/', (req, res) => {
    res.send('hello world');
});

//error handler
app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).send('Something broke!')
});

//listening port
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
