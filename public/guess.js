document.addEventListener("DOMContentLoaded", () => {
  const formbtn = document.querySelector("#generatebtn");
  const form = document.querySelector("#form");
  const formm = document.querySelector('#formm');


  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const random_num = Math.floor(Math.random() * 1);

    fetch("/save", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        random: random_num,
      }),
    })

      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          const famous_lyric = result.famous_lyric;
          const output_answer = result.answer;
          console.log(output_answer);
          console.log(famous_lyric);
          const output = document.querySelector("#famos_lyric");
          const guess_output = document.querySelector("#guess_output");
          guess_output.style.display = "flex";
          output.style.display = "flex";
          output.innerHTML = `The famous lyric is, "<b>  ${famous_lyric}" </b>`;
          guess_output.addEventListener('keydown', (e)=>{
            if(e.key=='Enter'){
                e.preventDefault();
                console.log("pressed");
                const guessed = guess_output.value;
                if(guessed.toLowerCase() == output_answer.toLowerCase()){
                    alert(`You GUESSED IT!!!! It was ${output_answer}`);
                }else{
                    alert(`WRONG! Better use your ball knowledge!`);
                    return;
                }
            }
          })
        }
      });
  });
  
  formm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const formdata = new FormData(formm);
    const vibes = formdata.get('vibes');
    const doing = formdata.get('doing');
    let lapsesong = false;
    let lazy = false;
    let freshing = false;
    if(doing==='Exercise'){
        lapsesong= true;
        lazy = false;
        freshing= false;
    }
    else if(doing==='doomscrolling'){
        lazy = true;
        freshing= false;
        lapsesong = false;
    }
    else if(doing==='Studying'){
        lapsesong = true;
        lazy = false;
        freshing = false;
    }
    else if(doing==='nothing'){
        freshing = true;
        lazy = false;
        lapsesong = false;
    }
    
    if(vibes==='energetic'){
        lapsesong = true;
        freshing= false;
        lazy = false;
    }
    else if(vibes==='sleepy'){
        lazy = true;
        freshing = false;
        lapsesong = false;
    }
    else if(vibes==='focus'){
        lapsesong = true;
        freshing = false;
        lazy = false;
    }
    else if(vibes==='chill'){
        freshing = true;
        lazy = false;
        lapsesong = false;
    }

    

    let helo;
    if(freshing == true){
       helo = 'freshing';
    }
    else if (lazy == true){
        helo = 'lazy';
    }
    else if(lapsesong == true){
        helo = 'lapse'
    }
    else{
        console.error('BRUH');
    }


  })
});
