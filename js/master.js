//////////selects//////////

const posts = document.querySelector("#main")
const eachPost = document.querySelector("#post")


/////////selects//////////


fetch('https://api.jamendo.com/v3.0/tracks/?client_id=9187c2a3&format=jsonpretty&limit=5&fuzzytags=groove+rock&speed=high+veryhigh&include=musicinfo&groupby=artist_id')
    .then(res => {
        console.log(res.status);
        if (res.ok) return res.json()
    })
    .then(data => {
        console.log(data);
        let h2 = document.createElement("h2")
        h2.innerHTML = "latest tracks"
        main.appendChild(h2)
        data.results.map((val) => {
            console.log(val.name);
            let div = document.createElement('div')
            div.innerHTML = `
             <figure id="post">
                <img src="${val.image}" alt="">
            </figure>
            <h3>${val.name}</h3>
            `
            main.appendChild(div)
        })
        fetch("https://api.jamendo.com/v3.0/artists/?client_id=9187c2a3&format=jsonpretty&limit=7")
            .then(res => {
                console.log(res.status);
                if (res.ok) return res.json()
            })
            .then(data => {
                console.log(data);
                let h2 = document.createElement("h2")
                h2.innerHTML = "artists"
                main.appendChild(h2)
                data.results.map((val) => {
                    if (val.image != "") {
                        let sec = document.createElement('section')
                        sec.innerHTML = `
                         <figure id="artist">
                            <img src="${val.image}" alt="">
                        </figure>
                        <h3>${val.name}</h3>
                        `
                        main.appendChild(sec)
                    }
                })
                fetch("https://api.jamendo.com/v3.0/albums/?client_id=9187c2a3&format=jsonpretty&limit=5")
                    .then(res => {
                        console.log(res.status);
                        if (res.ok) return res.json()
                    })
                    .then(data => {
                        let h2 = document.createElement("h2")
                        h2.innerHTML = "albums"
                        main.appendChild(h2)
                        data.results.map((val) => {
                            if (val.image != "") {
                                let div = document.createElement('div')
                                div.innerHTML = `
                             <figure id="post">
                                <img src="${val.image}" alt="">
                            </figure>
                            <h3>${val.name}</h3>
                            `
                                main.appendChild(div)
                            }
                        })

                        const posts = document.querySelectorAll("#post")
                        const cover = document.querySelector("#cover")
                        flag = 0
                        posts.forEach(val => {
                            val.addEventListener("click", () => {
                                console.log(val);
                                cover.src = val.children[0].currentSrc
                                cover.style.display = "block"
                                changeMusic(1)
                                togglePlay(songs[flag])
                                playMusic()
                                flag ++
                            })
                        });

                        ///////////////////////CONTROLLS////////////////////////



                        const playBtn = document.getElementById("play")
                        const prevBtn = document.querySelector(".prev")
                        const nextBtn = document.querySelector(".next")
                        const playerProgress = document.querySelector("#range")
                        

                        const music = new Audio();

                        const songs = [
                            {
                                path: 'src/music/1.mp3',
                            },
                            {
                                path: 'src/music/2.mp3',
                            },
                            {
                                path: 'src/music/3.mp3',
                            },
                            {
                                path: 'src/music/4.mp3',
                            },
                            {
                                path: 'src/music/5.mp3',
                            }
                        ];
                        let musicIndex = 0;
                        let isPlaying = false;

                        function togglePlay() {
                            if (isPlaying) {
                                pauseMusic();
                            } else {
                                playMusic();
                            }
                        }

                        function playMusic() {
                            isPlaying = true;
                            playBtn.setAttribute('title', 'Pause');
                            music.play();
                        }

                        function pauseMusic() {
                            isPlaying = false;
                            playBtn.setAttribute('title', 'Play');
                            music.pause();
                        }

                        function loadMusic(song) {
                            music.src = song.path;
                        }

                        function changeMusic(direction) {
                            musicIndex = (musicIndex + direction + songs.length) % songs.length;
                            loadMusic(songs[musicIndex]);
                            playMusic();
                        }

                        function updateProgressBar() {
                            const { duration, currentTime } = music;
                            const progressPercent = (currentTime / duration) * 100;
                            playerProgress.value = `${progressPercent}`;
                        }

                        function setProgressBar(e) {
                            const width = playerProgress.clientWidth;
                            const clickX = e.offsetX;
                            music.currentTime = (clickX / width) * music.duration;
                        }

                        playBtn.addEventListener('click', togglePlay);
                        prevBtn.addEventListener('click', () => changeMusic(-1));
                        nextBtn.addEventListener('click', () => changeMusic(1));
                        music.addEventListener('ended', () => changeMusic(1));
                        music.addEventListener('timeupdate', updateProgressBar);
                        playerProgress.addEventListener('click', setProgressBar);

                        loadMusic(songs[musicIndex]);
                        ///////////////////////CONTROLLS////////////////////////











                    })
            })


    })




