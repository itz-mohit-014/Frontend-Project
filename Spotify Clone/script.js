const songData = [
  {
    name: "Rabba Janda",
    artist: "Jubin Nautiyal",
    music: "./assets/songs/Rab-Janda.mp3",
    titleImage:
      "https://i.scdn.co/image/ab67616d00001e02329ff0cba5b14e0a1a3e8bea",
  },
  {
    name: "Saari Duniya Jalaa Denge",
    artist: "B Praak",
    music: "./assets/songs/saari-duniya-jalaa-denge.mp3",
    titleImage:
      "https://i.scdn.co/image/ab67616d00001e025f3ede47954a93aa03efe5f9",
  },
  {
    name: "Bapu Tere Karke",
    artist: "Amar Sandhu",
    music: "./assets/songs/Bapu-Tere-Karke.mp3",
    titleImage:
      "https://i.scdn.co/image/ab67616d00001e0290668b96d76da2a8ae809cc8",
  },
  {
    name: "Heeriye",
    artist: "Arijit Singh and Jasleen Royal",
    music: "./assets/songs/heeriye.mp3",
    titleImage:
      "https://i.scdn.co/image/ab67616d00001e024a60872ae145776164540a7f",
  },
  {
    name: "Husn",
    artist: "Ali Zafar",
    music: "./assets/songs/husn.mp3",
    titleImage:
      "https://i.scdn.co/image/ab67616d00001e020d3449f333a83a25feb423f8",
  },
  {
    name: "Arjun Vally",
    artist: "Bhupinder Babbal",
    music: "./assets/songs/ARJAN-VAILLY.mp3",
    titleImage:
      "https://i.scdn.co/image/ab67616d00001e02aeb151f6774b6edf52195631",
  },
  {
    name: "Khariyat",
    artist: "Arijit Singh",
    music: "./assets/songs/KHAIRIYAT.mp3",
    titleImage:
      "https://i.scdn.co/image/ab67616d00001e02eaa6b4bfb5954ee5a5a8ce9e",
  },
  {
    name: "Tu Aake Dekh le",
    artist: "King",
    music: "./assets/songs/Tu-aake-dekh-le.mp3",
    titleImage:
      "https://i.scdn.co/image/ab67616d00001e02678eae35be0325b5de578d57",
  },
  {
    name: "Tu Hai Kahan",
    artist: "AUR",
    music: "./assets/songs/tu-hai-kahan.mp3",
    titleImage:
      "https://i.scdn.co/image/ab67616d00001e023fb3fb3086a40c2c5062501d",
  },
];

// for song control
let playingSong = {
  previousSong: null,
  currentSong: null,
};

const songsCardWrapper = document.querySelector(".songs-card-wrapper");
const musicPlayerEl = document.querySelector("#music-player");
const currentSongImgEl = musicPlayerEl.querySelector("#current-song-img");
const currentSongNameEl = musicPlayerEl.querySelector("#cur-song-name");
const currentSongArtistNameEl = musicPlayerEl.querySelector("#cur-song-artist");
const playPauseBtn = musicPlayerEl.querySelector("#play-paused-btn");
const volumeBtn = musicPlayerEl.lastElementChild;
const seekBarInMusisPlayer = musicPlayerEl.querySelector(".song-seekbar");

const toggleSidebar = document
  .getElementById("toggle-sibebar")
  .addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("active");
    e.currentTarget.parentElement.classList.toggle("active");
  });

function appendSongs(songData) {
  const songCard = document.createElement("div");
  songCard.className = "songs-card transition bg-primary";
  songCard.innerHTML = `
    <div class="song-img-wrapper">
      <img
        src="${songData.titleImage}"
        alt="Song"
        class = "title-img"
      />
      <div class="play-icon transition">
        <svg
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 24 24"
          class="Svg-sc-ytk21e-0 bneLcE"
        >
          <path
            d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
          ></path>
        </svg>
      </div>
    </div>

    <div class="song-details">
      <h3 class="song-name">${songData.name}</h3>
      <p class="sond-artist">
        ${songData.artist}
      </p>
    </div>

    <audio src=${songData.music} controls data-song = ${songData.name
    .split(" ")
    .join("-")}>
      This audio is not support in your browser.
    </audio>

`;
  // card event
  songCard.addEventListener("click", (e) => {
    if (!musicPlayerEl.classList.contains("show")) {
      showMusicPlayer();
    }
    musicPlayer(e.currentTarget);
  });

  songsCardWrapper.appendChild(songCard);
}

function showMusicPlayer() {
  musicPlayerEl.style.display = "flex";
  setTimeout(() => {
    musicPlayerEl.classList.add("show");
  }, 10);

  musicPlayerControls();
}

function musicPlayer(songCard) {
  const songName = songCard.querySelector(".song-name").innerText;
  const songArtist = songCard.querySelector(".sond-artist").innerText;
  const songTitleImg = songCard.querySelector(".title-img").outerHTML;
  const songAudio = songCard.querySelector("audio");
  showCurrentSongInPlayer(songTitleImg, songName, songArtist);
  playSong(songAudio);
}

function showCurrentSongInPlayer(img, name, artist) {
  currentSongImgEl.innerHTML = img;
  currentSongNameEl.innerText = name;
  currentSongArtistNameEl.innerText = artist;
}

function musicPlayerControls() {
  let controls = musicPlayerEl
    .querySelector(".top-controls")
    .addEventListener("click", (e) => {
      if (e.currentTarget == e.target) return;

      let clickedControlEl = null;
      if (e.target.nodeName != "LI") {
        clickedControlEl = e.target.closest("li");
      } else {
        clickedControlEl = e.target;
      }

      clickedControlEl.classList.toggle("active");

      switch (clickedControlEl.id) {
        case "prev":
          loadPrevSong(clickedControlEl);
          break;

        case "play-paused-btn":
          playPauseSong(clickedControlEl);
          break;

        case "next":
          loadNextSong(clickedControlEl);
          break;
      }
    });
}

// *****panding ****
function loadingSongAnimation() {
  let spanLoadingSongEl = document.createElement("span");
  spanLoadingSongEl.className = "loading-song-circle show";
  spanLoadingSongEl.id = "loadingSong";

  playPauseBtn.appendChild(spanLoadingSongEl);

  playingSong.currentSong.addEventListener("loadeddata", function () {
    playPauseBtn.removeChild(spanLoadingSongEl);
  });
}

function playPauseSong(playPauseBtn) {
  const playSvg = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>`;
  const pauseSvg = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>`;

  if (playPauseBtn.classList.contains("active")) {
    playPauseBtn.innerHTML = pauseSvg;
    if (playingSong.currentSong) {
      playingSong.currentSong.play();
      intervarId = setInterval(() => {
        updateCurrentSongTime();
      }, 1000);
    }
  } else {
    playPauseBtn.innerHTML = playSvg;
    if (playingSong.currentSong) {
      playingSong.currentSong.pause();
      clearInterval(intervarId);
    }
  }
}

function loadNextSong(nextEl = null) {
  if (nextEl) {
    nextEl.classList.remove("active");
  }
  removeRepeatingSongs();
  if (
    songsCardWrapper.lastElementChild === playingSong.currentSong.parentElement
  )
    return;

  let nextSongCard = playingSong.currentSong.parentElement.nextElementSibling;
  musicPlayer(nextSongCard);
}

function loadPrevSong(prevEl = null) {
  if (prevEl) {
    prevEl.classList.remove("active");
  }
  removeRepeatingSongs();
  if (
    songsCardWrapper.firstElementChild === playingSong.currentSong.parentElement
  )
    return;

  let previousSongCard =
    playingSong.currentSong.parentElement.previousElementSibling;
  musicPlayer(previousSongCard);
}

function removeRepeatingSongs() {
  if (
    playPauseBtn.parentElement.lastElementChild.classList.contains("active")
  ) {
    playPauseBtn.parentElement.lastElementChild.classList.remove("active");
  }

  for (song in playingSong) {
    if (playingSong[song].parentElement.classList.contains("repeatSong")) {
      playingSong[song].parentElement.classList.remove("repeatSong");
    }
  }
}

function playSong(song) {
  playPauseBtn.classList.add("active");
  playPauseSong(playPauseBtn);
  song.currentTime = 0;

  playingSong.currentSong = song;
  if (!playingSong.previousSong) {
    playingSong.previousSong = playingSong.currentSong;
    playingSong.currentSong.play();
  } else {
    playingSong.previousSong.pause();
    playingSong.previousSong = playingSong.currentSong;
    playingSong.currentSong.play();
  }

  updateSongTimingInPlayer();
}

function playSongInSuffelMode(el) {
  let randomSong =
    songsCardWrapper.children[
      Math.floor(Math.random() * songsCardWrapper.children.length)
    ];

  musicPlayer(randomSong);
}

function repeatMode(repeatControlIcon) {
  let repeatedSong = playingSong.currentSong.parentElement;

  if (repeatControlIcon.classList.contains("active")) {
    repeatedSong.classList.add("repeatSong");
  } else {
    repeatedSong.classList.remove("repeatSong");
  }
}

let intervarId;
function updateSongTimingInPlayer() {
  let totalDurationEl = seekBarInMusisPlayer.nextElementSibling;

  let m = Math.floor(playingSong.currentSong.duration / 60);
  let s = Math.floor(playingSong.currentSong.duration % 60);
  let min = m < 10 ? `0${m}` : m;
  let sec = s < 10 ? `0${s}` : s;

  totalDurationEl.innerHTML = `${min}:${sec} `;

  updateCurrentSongTime();

  intervarId = setInterval(() => {
    updateCurrentSongTime();
  }, 1000);
}

function updateCurrentSongTime() {
  let curDurationEl = seekBarInMusisPlayer.previousElementSibling;

  let m = Math.floor(playingSong.currentSong.currentTime / 60);
  let s = Math.floor(playingSong.currentSong.currentTime % 60);

  let min = m < 10 ? `0${m}` : m;
  let sec = s < 10 ? `0${s}` : s;

  curDurationEl.innerHTML = `${min}:${sec} `;
  updateSeekbarViaSongDuration();

  // load next or repeat song or suffel
  if (
    playingSong.currentSong.currentTime === playingSong.currentSong.duration
  ) {
    if (
      playingSong.currentSong.parentElement.classList.contains("repeatSong")
    ) {
      playSong(playingSong.currentSong);
    } else if (
      playPauseBtn.parentElement.children[0].classList.contains("active")
    ) {
      playSongInSuffelMode();
    } else {
      loadNextSong();
    }
  }
}

function updateSeekbarViaSongDuration() {
  let songCurDuration =
    (playingSong.currentSong.currentTime / playingSong.currentSong.duration) *
    100;

  seekBarInMusisPlayer.value = songCurDuration;
}

function showVolueBtn(e) {
  let volumeBarContainer = e.currentTarget.querySelector(".volume-bar");
  volumeBarContainer.classList.toggle("show");
}

function increseDecresVolume(e) {
  let showVoumeEl = e.currentTarget.nextElementSibling;
  showVoumeEl.innerHTML = e.currentTarget.value;
  playingSong.currentSong.volume = e.currentTarget.value / 100;
}

seekBarInMusisPlayer.addEventListener("input", (e) => {
  let position = (e.currentTarget.value / 100) * 100;

  let changeDuration = (playingSong.currentSong.currentTime =
    (Math.floor(position) / 100) * playingSong.currentSong.duration);
});

volumeBtn.addEventListener("click", showVolueBtn);
volumeBtn.querySelector("input").addEventListener("input", increseDecresVolume);

songsCardWrapper.innerHTML = "";
songData.forEach((song) => {
  appendSongs(song);
});
