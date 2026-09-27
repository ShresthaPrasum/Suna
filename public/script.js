document.addEventListener('DOMContentLoaded', (e)=>{

    let song_data = [] 

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
            song_data = result.song_data;
            loadArtistSongs('Arctic Monkeys');
        }
    })
    .catch(error=> console.error(error));

    // VEry important variables which will be used to create song divs and for the audio playing logic
    const song_name = document.querySelector('#song-name');

    const backward  = document.querySelector('#backward');
    const play_pause  = document.querySelector('#play');
    const forward  = document.querySelector('#forward');

    const current_time  = document.querySelector('#current-time');
    
    const progress_bar  = document.querySelector('#progress-bar');

    const total_time  = document.querySelector('#total-time');
    
    const volume  = document.querySelector('#volume-slider');

    let audio_playing = false;

    let currentAudio = null;

    let currentAudioIndex = -1;

    let allAudios = []

    let music_container = document.querySelector('.musics');

    let artists = document.querySelectorAll('.singer');


    function loadArtistSongs(artistSlug) {
        music_container.innerHTML = '';
        allAudios = [];
        currentAudioIndex = -1;

        song_data.forEach((song) => {
            if (song.author === artistSlug) {
                initializeAudioElements(song);
            }
        });
    }


    artists.forEach((artist)=>{
        artist.addEventListener('click', (e)=>{
            console.log(artist.dataset.singer);
            loadArtistSongs(artist.dataset.singer);
        })
    })

    function initializeAudioElements(song){
        let songDiv = document.createElement('div');
        songDiv.className = 'music'
        

        let songCover = document.createElement('img');
        songCover.src = song.cover;
        songCover.className = 'music-cover';
        songDiv.append(songCover);

        let songName = document.createElement('p');
        songName.className = 'song-name ';
        songName.innerHTML = song.name;
        songDiv.append(songName);

        let songArtist = document.createElement('p');
        songArtist.className = 'artist-name bg-grey';
        songArtist.innerHTML = song.author;
        songDiv.append(songArtist);

        const pressplay = document.createElement("button");
        pressplay.className = "press-play";
        pressplay.innerHTML = "<i class='fas fa-play'></i>";
        songDiv.append(pressplay);

        let audio = document.createElement('audio');
        audio.src = song.path;

        songDiv.append(audio);

        allAudios.push(audio);

        audio.addEventListener('loadedmetadata', ()=>{
            total_time.innerHTML = formatTime(audio.duration);
        });
    

        audio.addEventListener('timeupdate', ()=>{
            if(currentAudio === audio){
                
                current_time.innerHTML = formatTime(audio.currentTime);
                total_time.innerHTML = formatTime(audio.duration);

                const percentage = (audio.currentTime/ audio.duration) * 100;
                progress_bar.value = percentage;
            }
        });

        audio.addEventListener('ended', ()=>{
            playNextAudio();
        });
        

        pressplay.addEventListener('click',()=>{
            currentAudioIndex = allAudios.indexOf(audio);
            console.log(currentAudioIndex);
            playAudio(audio);
        })

        music_container.append(songDiv);
    }

    function playAudio(audio){
        if(currentAudio && currentAudio !== audio){
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        if(audio.paused){
            audio.play();
            currentAudio = audio;
            audio_playing = true;
            play_pause.innerHTML = "<i class='fas fa-pause'></i>";
        }else{

            audio.pause();
            audio_playing = false;
            play_pause.innerHTML = "<i class='fas fa-play'></i>";

        }

        song_name.innerHTML = audio.parentElement.querySelector(".song-name").innerHTML;
    }

    function formatTime(time){
        if(isNaN(time)){
            return "0:00";
        }
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    progress_bar.addEventListener('input', ()=>{
        if(!currentAudio){
            return;
        }
        currentAudio.currentTime = (progress_bar.value / 100) * currentAudio.duration;
    })

    play_pause.addEventListener('click',()=>{
        if(!currentAudio){
            return;
        }
        if(currentAudio.paused){
            currentAudio.play();
            audio_playing = true;
            play_pause.innerHTML = "<i class='fas fa-pause'></i>";
        }

        else{
            currentAudio.pause();
            audio_playing = false;
            play_pause.innerHTML = "<i class='fas fa-play'></i>";
        }
    })

    volume.addEventListener('input', ()=>{
        if(currentAudio){
            currentAudio.volume = volume.value/100;
        }
    })

    function playNextAudio(){
        if(currentAudioIndex === -1 || allAudios.length === 0){
            return;
        }

        let nextIndex = currentAudioIndex + 1;

        if(nextIndex >= allAudios.length){
            nextIndex = 0;
        }

        currentAudioIndex = nextIndex;
        playAudio(allAudios[nextIndex])
    }

    forward.addEventListener('click', ()=>{
        playNextAudio();
    })

    backward.addEventListener('click', ()=>{
        if(currentAudioIndex === -1 || allAudios.length === 0){
            return;
        }

        let prevIndex = currentAudioIndex - 1;

        if(prevIndex < 0){
            prevIndex = allAudios.length - 1;
        }

        currentAudioIndex = prevIndex;

        playAudio(allAudios[prevIndex])
    })
    
})

