const rapid = require('./rapid');

const app = rapid();

app.use('/', require('./routes/home'));

const PORT = 5000;

app.start(PORT).then(() => {
  console.log(`[server] started on port ${PORT}`);
})