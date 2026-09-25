const { response } = require("express");

document.addEventListener('DOMContentLoaded', ()=>{
    const formbtn = document.querySelector('#generatebtn');
    const form = document.querySelector('form');
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const random_num = Math.floor(Math.random() * 690);
        fetch('/save',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                random: random_num
            })
        })
        .then(response=>response.json())
        
    })
})