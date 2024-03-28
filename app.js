require('dotenv').config();
const  { Downloader } = require('ytdl-mp3');

const express = require('express');
const fs = require('fs');
const ytdl = require('ytdl-core');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const https = require('https'); 
const path = require('path');
app.use(express.json());


io.sockets.on('connection', (socket) => {
    console.log('socket success');
    socket.on('rupp-role-update-event', function (data) {
        socket.emit(data.event, data.data);
    });
});


app.post("/", async function(req, res) { 
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

server.listen(3000, "127.0.0.1",() => console.log(`app listening on port http://127.0.0.1!`));

io.listen(3000);