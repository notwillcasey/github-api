const app = require('./server.js');

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}`)
});