require('dotenv').config();

const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.json());


// io.sockets.on('connection', (socket) => {
//     console.log('socket success');
//     socket.on('rupp-role-update-event', function (data) {
//         socket.emit(data.event, data.data);
//     });
// });


app.post("/", async function (req, res) {
  console.log(req.body);
  const fs = require('fs');
  content = JSON.stringify(req.body);

  fs.writeFile('test.txt', content, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File saved!');
  });
  res.send({
    'message': "Success"
  });
});

const fs = require('fs').promises;

app.post("/getData", async function (req, res) {
  try {
    // Read the contents of 'test.txt' asynchronously
    const data = await fs.readFile('test.txt', 'utf8');
    res.send({
      'data': data
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading the file');
  }
});


// server.listen(3000, "127.0.0.1",() => console.log(`app listening on port http://127.0.0.1!`));

// io.listen(3000);
server.listen(3000, "0.0.0.0", () => console.log(`Server listening on http://127.0.0.1:3000`));

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log('Address in use, retrying...');
    setTimeout(() => {
      server.close();
      server.listen(3000, "0.0.0.0");
    }, 1000);
  } else {
    console.error(e);
  }
});