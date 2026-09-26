document.addEventListener('DOMContentLoaded', (e)=>{
    fetch('/get', {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            msg: 'HELOOO',
            msgg: "HELOOO"
        })
        })
        .then(response=>response.json())
        .then(result=>{
            if(result.success){
                const song_data = result.song_data;
                const paths = result.paths;
                const covers = result.covers;
                console.log(song_data);
                console.log(paths);
            }
        })
    .catch(error=> console.error(error));

    let artists = document.querySelectorAll('.singer');

    artists.forEach((artist)=>{
        artist.addEventListener('click', (e)=>{
            console.log(artist.dataset.singer);
        })
    })
})

