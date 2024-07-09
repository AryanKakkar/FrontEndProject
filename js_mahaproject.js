let SONG = new Audio()
let index = 0
let folder=""
async function getSongs(folder){ 
    let a=await fetch(`http://127.0.0.1:3000/BeatWave/${folder}/`)
    let response = await a.text()
    let div=document.createElement("div")
    div.innerHTML=response
    let as=div.getElementsByTagName("a")
    let songs=[]
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith("mp3")){
            songs.push(element.href)
        }
    }
    return songs
}

let songUL = document.querySelector(".scroll1").getElementsByTagName("ul")[0]

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "Invalid input";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

let butt = document.querySelector(".pause")
let songInfo=document.querySelector(".song-info")
let songDuration=document.querySelector(".song-duration")

const playMusic=(track,info,pause=false)=>{
    SONG.src=track
    if(!pause){ 
        SONG.play()
        butt.innerHTML=`<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI" height="15px" width="15px"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>`
    }
    let n = info.split("-")
    songInfo.innerHTML=`<p style="font-size: 14px; font-weight: 400; color: white;">${n[0]}</p>
<p style="font-size: 12px; font-weight: 200; color: grey;">${n[1]}</p>`
    songDuration.innerHTML="00:00/00:00"
}

async function main(folder) {   
    let songs = await getSongs(folder);
    let j = Math.floor(Math.random()*7)
    console.log(folder)
    console.log(songs)
    let s = `${songs[j]}`.split(`${folder}/`)[1].split(".")[0]
    playMusic(songs[j],s,true)

    for(const song of songs) {
        let b = song.replaceAll("%20"," ").split(`${folder}/`)[1].split(".")[0].split("-")
        songUL.innerHTML = songUL.innerHTML + `<li><div class="image">
                                <img src="Songs_cover.jpg" alt="">
                                <div class="song_desc">
                                    <div class="song_name">${b[0]}</div>
                                    <div class="artist">${b[1]}</div>
                                </div>
                                <div class="PLAY">
                                    <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI" height="20" width="20">
                                        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" fill="white"></path>
                                      </svg>
                                </div>
                            </div></li>`
    }

    Array.from(document.querySelector(".scroll1").getElementsByTagName("li")).forEach(e=>{

        e.addEventListener("click",element=>{
            let d = `${e.querySelector(".song_name").innerHTML}-${e.querySelector(".artist").innerHTML}`
            let c=`http://127.0.0.1:3000/BeatWave/${folder}/${e.querySelector(".song_name").innerHTML}-${e.querySelector(".artist").innerHTML}.mp3`
            playMusic(c,d)
        })
    })

    document.querySelector(".seekbar").addEventListener("click",(e)=>{
        let percent = e.offsetX/e.target.getBoundingClientRect().width*100
        console.log(e.offsetX/e.target.getBoundingClientRect().width*100)
        document.querySelector(".circle").style.left= percent +"%"
        SONG.currentTime = (percent*SONG.duration)/100
    })

    SONG.addEventListener("timeupdate",()=>{
        document.querySelector(".song-duration").innerHTML=`${secondsToMinutesSeconds(SONG.currentTime)} : ${secondsToMinutesSeconds(SONG.duration)}`
        document.querySelector(".circle").style.left=`${(SONG.currentTime/SONG.duration)*100}%`
        if(SONG.currentTime==SONG.duration){
            let lk = Math.floor(Math.random()*7)
            let sk = `${songs[lk]}`.split(`${folder}/`)[1].split(".")[0]
            playMusic(songs[lk],sk)
        }
    })

    document.querySelector(".next").addEventListener("click",(e)=>{
        let source = SONG.src
        let i
        for(i=0 ;i<songs.length;i++){
            if(songs[i]==source){
                index=(i+1)%songs.length
                console.log(index)
            }
        }
        let ik = `${songs[index]}`.split(`${folder}/`)[1].split(".")[0]
        playMusic(songs[index],ik)
    })

    document.querySelector(".back").addEventListener("click",(e)=>{
        let source = SONG.src
        let i
        for(i=0 ;i<songs.length;i++){
            if(songs[i]==source){
                index=(i-1)%songs.length
                console.log(index)
            }
        }
        let ik = `${songs[index]}`.split(`${folder}/`)[1].split(".")[0]
        playMusic(songs[index],ik)
    })

    butt.addEventListener("click",(e)=>{
        if(SONG.paused){
            SONG.play ()
            butt.innerHTML=`<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI" height="15px" width="15px"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>`
        }
        else{
            SONG.pause()
            butt.innerHTML=`<svg id="play" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI" height="15" width="15">
                        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
                      </svg>`
        }
        console.log(butt.innerHTML)
    })

    document.querySelector("#volume").addEventListener("change", (e)=>{
        SONG.volume=parseInt(e.target.value)/100
    })

    
}

function updateRange(range) {
    const value = (range.value - range.min) / (range.max - range.min) * 100;
    range.style.background = `linear-gradient(to right, rgb(55, 226, 55) ${value}%, #fff ${value}%)`;
}

// Initialize the gradient on load
document.addEventListener("DOMContentLoaded", function() {
    updateRange(document.getElementById('volume'));
});


Array.from(document.getElementsByClassName("card")).forEach(e => {
    e.addEventListener("click",(t)=> {
        console.log(t)
        folder = e.getElementsByTagName("h3")[0].innerText.replaceAll(" ","");
        songUL.innerHTML=""
        butt.innerHTML=`<svg id="play" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI" height="15" width="15">
                        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
                      </svg>`
        main("Songs")
    });
});



// let arrow = document.querySelector(".arrow").children[0]
// console.log(arrow)

document.querySelector(".arrow").children[0].addEventListener("click",(e)=>{
    document.querySelector(".side").style.left="0%"
})

document.querySelector(".sdiv1-img1").children[1].addEventListener("click",(e)=>{
    document.querySelector(".side").style.left="-120%"
})
