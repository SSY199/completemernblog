import express from 'express';

const app = express();

app.listen(1024, () => {
  console.log('Server is running on port 1024');
});