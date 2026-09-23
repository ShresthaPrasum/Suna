const express = require('express');
const port = 5000;
const app = express();
const fs = require('fs');
const path = require('path');

const data = fs.readFileSync('./song_data.json');
const parsed = JSON.parse(data);
console.log(parsed);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
})