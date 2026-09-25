const express = require('express');
const port = 5000;
const app = express();
const fs = require('fs');;
const path = require('path');
const pathhs = [];
const coverss = [];

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const data = fs.readFileSync('./song_data.json');
const song_data = JSON.parse(data);
console.log(song_data)
for(let i=0; i<song_data.length; i++){
    const pathh = song_data[i].pathh;
    const cover = song_data[i].cover
    pathhs.push(pathh);
    coverss.push(cover);
}

app.post('/get',(req,res)=>{
    const msg = req.body.msg;
    res.json({
        song_data: song_data,
        paths: pathhs,
        covers: coverss,
        success: true
    })
    console.log(msg);
})

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
})