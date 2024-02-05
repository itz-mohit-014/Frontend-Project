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
  {
    name: "Tera Chehra",
    artist: "Arijit Singh",
    music: "./assets/songs/Tera-Chehra.mp3",
    titleImage:
      "https://i.scdn.co/image/ab67616d00001e02b889b365c25bfa01f9772a1e",
  },
  {
    name: "O Sajna",
    artist: "Akhil Sachdeva",
    music: "./assets/songs/O-Saajna.mp3",
    titleImage:
      "https://i.scdn.co/image/ab67616d00001e02ecf2a706ac0b939a3c708c70",
  },
];

// for song control
let playingSong = {
  previousSong: null,
  currentSong: null,
};

const songsCardWrapper = document.querySelector(".songs-card-wrapper");
const musicPlayerEl = document.querySelector("#music-player");
const showCurrentPlayingSongInPlayerEl = musicPlayerEl.querySelector(
  "#playing-current-song"
);

const playPauseBtn = musicPlayerEl.querySelector("#play-paused-btn");
const volumeBtn = musicPlayerEl.lastElementChild;
const seekBarInMusisPlayer = musicPlayerEl.querySelector(".song-seekbar");
const viewMode = document.querySelector(".view-mode");

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

function showCurrentSongInPlayer(img, songName, artist) {
  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("song-pic");
  imgWrapper.innerHTML = img;

  const songDetailsWrapper = document.createElement("div");
  songDetailsWrapper.classList.add("current-song-details");
  songDetailsWrapper.innerHTML = `
  <h5 class="song-name" >${songName}</h5>
  <p class="song-artist" >${artist}</p>
  `;

  const favIconWrapper = document.createElement("div");
  favIconWrapper.className = "favorite-icon";
  favIconWrapper.innerHTML = `
  <svg
  data-encore-id="icon"
  role="img"
  aria-hidden="true"
  viewBox="0 0 16 16"
  class="transition"
>
  <path
    d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"
  ></path>
</svg>
  `;
  // favorite icon eventlistender
  favIconWrapper.addEventListener("click", addToFavorite);
  showCurrentPlayingSongInPlayerEl.innerHTML = "";
  showCurrentPlayingSongInPlayerEl.appendChild(imgWrapper);
  showCurrentPlayingSongInPlayerEl.appendChild(songDetailsWrapper);
  showCurrentPlayingSongInPlayerEl.appendChild(favIconWrapper);
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
        case "repeat-mode":
          repeatMode(clickedControlEl);
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

function addToFavorite() {
  let fillSvg = ` <svg
  data-encore-id="icon"
  role="img"
  aria-hidden="true"
  viewBox="0 0 16 16"
>
  <path
    d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"
  ></path>
</svg> `;
}

function playSong(song) {
  playPauseBtn.classList.add("active");
  playPauseSong(playPauseBtn);
  song.currentTime = 0;

  playingSong.currentSong = song;
  if (!playingSong.previousSong) {
    playingSong.previousSong = playingSong.currentSong;
    playingSong.currentSong.play();
    // active song
    playingSong.currentSong.parentElement.classList.add("active");
  } else {
    playingSong.previousSong.pause();
    playingSong.previousSong.parentElement.classList.remove("active");
    playingSong.previousSong = playingSong.currentSong;
    playingSong.currentSong.play();
    playingSong.currentSong.parentElement.classList.add("active");
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

function toggleVolumeBtn(e) {
  let volumeBarContainer = e.currentTarget.querySelector(".volume-bar");
  volumeBarContainer.classList.toggle("show");
}

function increseDecreseVolume(e) {
  let showVoumeEl = e.currentTarget.nextElementSibling;
  showVoumeEl.innerHTML = e.currentTarget.value;
  playingSong.currentSong.volume = e.currentTarget.value / 100;
}

function expandMusicPlayer(e) {
  if (window.innerWidth < 992) {
    const closeExpandViewIcon = musicPlayerEl.querySelector(
      "#expand-player-view"
    );
    closeExpandViewIcon.addEventListener("click", (e) => {
      musicPlayerEl.classList.remove("expand");
      setTimeout(() => {
        musicPlayerEl.addEventListener("click", expandMusicPlayer);
      }, 10);
    });

    this.classList.add("expand");
    if (this.classList.contains("expand")) {
      this.removeEventListener("click", expandMusicPlayer);
    }
  }
}

// event listeners
seekBarInMusisPlayer.addEventListener("input", (e) => {
  let position = (e.currentTarget.value / 100) * 100;

  playingSong.currentSong.currentTime =
    (Math.floor(position) / 100) * playingSong.currentSong.duration;
});

volumeBtn.addEventListener("click", toggleVolumeBtn);
volumeBtn.querySelector("input").addEventListener("change", (e) => {
  e.currentTarget.parentElement.classList.remove("show");
});
volumeBtn
  .querySelector("input")
  .addEventListener("input", increseDecreseVolume);

viewMode.addEventListener("click", (e) => {
  if (e.currentTarget === e.target) return;
  let changeViewModeEl = null;
  if (e.target.nodeName !== "DIV") {
    changeViewModeEl = e.target.closest("div");
  } else {
    changeViewModeEl = e.target;
  }
  if (changeViewModeEl.classList.contains("row-view")) {
    Array.from(songsCardWrapper.children).forEach((songCard) => {
      songCard.classList.add("row-view");
    });
  } else {
    Array.from(songsCardWrapper.children).forEach((songCard) => {
      if (songCard.classList.contains("row-view")) {
        songCard.classList.remove("row-view");
      }
    });
  }
});

songsCardWrapper.innerHTML = "";
songData.forEach((song) => {
  appendSongs(song);
});

// mobile view player
musicPlayerEl.addEventListener("click", expandMusicPlayer);
