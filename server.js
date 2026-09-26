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
    const cover = song_data[i].cover;
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

app.post('/save', (req,res)=>{
    const randomnum = req.body.random;
    const lyricc = song_data[randomnum].famous_lyric;
    res.json({
        success:true,
        famous_lyric: lyricc,
        answer: song_data[randomnum].name
    })
})

app.post('/savee', (req,res)=>{
    const genre = req.body.needed_song;
    const filtered = song_data.filter(s=>s.genre === genre);
    const random_num1 = Math.round(Math.random() * filtered.length) - 1;
    const selected = filtered[random_num1];

    console.log(selected);
    console.log(random_num1);

    res.json({
        success:true,
        req_song: selected
    })
})

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
})