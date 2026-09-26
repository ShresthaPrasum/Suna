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

    const musics = {
        arctic_monkey: [
            {'doiwannaknow': 'Do I wanna Know'},
            {'ru_mine': 'R U Mine'},
            {'505': '505'},
            {'kneesocks': 'Knee Socks'},
            {'rumine':'R U Mine'},
            {'no1partyanthem': 'No. 1 Party Anthem'},
            {'arabella': 'Arabella'},
            {'snapoutofit': 'snapoutofit'}
        ]
        ,
        lana_del_rey:[
            {'summertimesadness': 'Summertime Sadness'},
            {'youngandbeautiful': 'Young and Beautiful'},
            {'borntodie': 'Born To DIe'},
            {'bluejeans':'Blue Jeans'},
            {'westcoast': 'West Coast'},
            {'lustforlife': 'Lust For Life'},
            {'sayyestoheaven': 'Say Yes To Heavem'}
        ],
        kendrick_lamar:[
            {'humble': 'Humble'},
            {'allthestars': 'All The Stars'},
            {'notlikeus': 'Not Like Us'},
            {'moneytree':'Money Tree'},
            {'loyalty': 'Loyalty'},
            {'peekaboo': 'Peekaboo'}
        ],
        yabesh_thapa:[
            {'kasari': 'Kasari'},
            {'aakhale': 'Aakhale'},
            {'aemutu': 'Ae Mutu'},
            {'alaptra':'Alaptra'},
            {'fewataal': 'Fewataal'},
            {'firfirey': 'Firfirey'}
        ],

        nepali:[
            {'kyomayaho': 'K yo Maya Ho'},
            {'aakhakobato': 'Aakhako Bato'},
            {'suna': 'Suna'},
            {'maskimaski': 'Maski Maski'},
            {'nihita': 'Nihita'},
            {'vananamatrw': 'Vanana Matrw'}
        ],

        imagine_dragons:[
            {'believer': 'Believer'},
            {'demons': 'Demons'},
            {'radioactive': 'Radioactive'},
            {'thunder':'Thunder'},
            {'whateverittakes': 'Whatever It Takes'},
            {'bones': 'Bones'}
        ],

        eminem:[
            {'loseyourself': 'Lose Yourself'},
            {'stan': 'Stan'},
            {'notafraid': 'Not Afraid'},
            {'therealSlimShady':'The Real Slim Shady'},
            {'withoutme': 'Without Me'},
            {'rapgod': 'Rap God'}
        ]
    }

    let artists = document.querySelectorAll('.singer');

    artists.forEach((artist)=>{
        artist.addEventListener('click', (e)=>{
            console.log(artist.dataset.singer);
        })
    })
})

