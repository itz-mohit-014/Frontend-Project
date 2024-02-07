let playingSong = {
  previousSong: null,
  currentSong: null,
};
let currentPlayingSongCard = null;
const viewMode = document.querySelector(".view-mode");
const songsCardWrapper = document.querySelector(".songs-card-wrapper");
const musicPlayerEl = document.querySelector("#music-player");
const showCurrentSongInPlayerEl = musicPlayerEl.querySelector(
  "#playing-current-song"
);

const playPauseBtn = musicPlayerEl.querySelector("#play-paused-btn");
const volumeBtn = musicPlayerEl.lastElementChild;
const seekBarInMusisPlayer = musicPlayerEl.querySelector(".song-seekbar");

const toggleSidebar = document
  .getElementById("toggle-sibebar")
  .addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("active");
    e.currentTarget.parentElement.classList.toggle("active");
  });

function addSongs(songData) {
  const songCard = document.createElement("div");
  songCard.className = "songs-card transition bg-primary";
  songCard.id = songData.name;
  songCard.innerHTML = `
    <div class="song-img-wrapper loading">
      <img
        src="${songData.image}"
        alt="Song"
        class = "title-img hide"
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

    <audio src=${songData.song} controls>
      This audio is not support in your browser.
    </audio>

`;
  // card event
  songCard.addEventListener("click", (e) => {
    if (!musicPlayerEl.classList.contains("show")) {
      showMusicPlayer();
    }
    updateCurrentPlayingSong(e);
    musicPlayer(songData);
  });
  const coverImg = songCard
    .getElementsByTagName("img")[0]
    .addEventListener("load", (e) => {
      e.currentTarget.parentElement.classList.remove("loading");
      e.currentTarget.classList.remove("hide");
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

function updateCurrentPlayingSong(e) {
  Array.from(songsCardWrapper.children).forEach((songCard) => {
    songCard.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
  currentPlayingSongCard = e.currentTarget;
}

function musicPlayer(songData) {
  const songName = songData.name;
  const songArtist = songData.artist;
  const songImg = `<img src="${songData.image}" alt="Song" class="title-img" />`;
  const songAudio = new Audio(songData.song);
  showCurrentSongInPlayer(songImg, songName, songArtist);
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

  const favIconWrapper = document.createElement("span");
  favIconWrapper.className = "favorite-icon";
  favIconWrapper.innerHTML = `<img src="./assets/img/heart.svg" alt="Logo" class="invert" />`;
  // favorite icon eventlistender
  favIconWrapper.addEventListener("click", addToFavorite);
  showCurrentSongInPlayerEl.innerHTML = "";
  showCurrentSongInPlayerEl.appendChild(imgWrapper);
  showCurrentSongInPlayerEl.appendChild(songDetailsWrapper);
  showCurrentSongInPlayerEl.appendChild(favIconWrapper);
}

function addToFavorite() {
  this.classList.toggle("active");
  if (this.classList.contains("active")) {
    this.innerHTML =
      '<img src="./assets/img/favorite.svg" alt="Logo" class="invert" />';
  } else {
    this.innerHTML = `<img src="./assets/img/heart.svg" alt="Logo" class="invert" />`;
  }
}

function playSong(song) {
  playPauseBtn.classList.add("active");
  song.currentTime = 0;
  playingSong.currentSong = song;
  playPauseSong();

  if (!playingSong.previousSong) {
    playingSong.previousSong = playingSong.currentSong;
    playingSong.currentSong.play();
  } else {
    playingSong.previousSong.pause();
    playingSong.previousSong = playingSong.currentSong;
    playingSong.currentSong.play();
  }
  updateSongTimingInPlayer(song);
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

function playPauseSong() {
  if (playPauseBtn.classList.contains("active") && playingSong.currentSong) {
    playPauseBtn.children[0].src = "./assets/img/play.svg";
    playingSong.currentSong.play();
    // update timing
    intervarId = setInterval(() => {
      updateCurrentSongTime();
    }, 1000);
  } else {
    playPauseBtn.children[0].src = "./assets/img/pause.svg";
    if (playingSong.currentSong) {
      playingSong.currentSong.pause();
    }
    clearInterval(intervarId);
  }
}

function loadNextSong(nextEl = null) {
  if (nextEl) {
    nextEl.classList.remove("active");
  }
  removeRepeatingSongs();

  let currentSongIndex = null;
  Array.from(songsCardWrapper.children).filter((songCard, idx) => {
    songCard === currentPlayingSongCard ? (currentSongIndex = idx) : null;
  });
  if (currentSongIndex === songsCardWrapper.children.length - 1) return;
  const nextSongData = creteSongDataObjFromAlbum(
    songsCardWrapper.children[currentSongIndex + 1]
  );
  currentPlayingSongCard = songsCardWrapper.children[currentSongIndex + 1];
  musicPlayer(nextSongData);
}

function loadPrevSong(prevEl = null) {
  if (prevEl) {
    prevEl.classList.remove("active");
  }

  removeRepeatingSongs();
  let currentSongIndex = null;
  Array.from(songsCardWrapper.children).filter((songCard, idx) => {
    songCard === currentPlayingSongCard ? (currentSongIndex = idx) : null;
  });
  if (!currentSongIndex) return;
  const prevSongData = creteSongDataObjFromAlbum(
    songsCardWrapper.children[currentSongIndex - 1]
  );
  currentPlayingSongCard = songsCardWrapper.children[currentSongIndex - 1];
  musicPlayer(prevSongData);
}

function removeRepeatingSongs() {
  if (
    playPauseBtn.parentElement.lastElementChild.classList.contains("active")
  ) {
    playPauseBtn.parentElement.lastElementChild.classList.remove("active");
  }
}

function playSongInSuffelMode() {
  removeRepeatingSongs();
  let randomSong =
    songsCardWrapper.children[
      Math.floor(Math.random() * songsCardWrapper.children.length)
    ];
  let randomSongData = creteSongDataObjFromAlbum(randomSong);
  currentPlayingSongCard = randomSong;
  musicPlayer(randomSongData);
}

function creteSongDataObjFromAlbum(songCard) {
  return {
    name: songCard.querySelector(".song-name").innerText,
    artist: songCard.querySelector(".sond-artist").innerText,
    image: songCard.querySelector(".title-img").src,
    song: songCard.querySelector("audio").src,
  };
}

let intervarId;
function updateSongTimingInPlayer(song) {
  let totalDurationEl = seekBarInMusisPlayer.nextElementSibling;
  song.addEventListener("loadedmetadata", () => {
    let m = Math.floor(playingSong.currentSong.duration / 60);
    let s = Math.floor(playingSong.currentSong.duration % 60);
    let min = m < 10 ? `0${m}` : m;
    let sec = s < 10 ? `0${s}` : s;
    totalDurationEl.innerHTML = `${min}:${sec} `;
  });
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
    if (playPauseBtn.parentElement.children[0].classList.contains("active")) {
      playSongInSuffelMode();
    } else if (
      playPauseBtn.parentElement.lastElementChild.classList.contains("active")
    ) {
      playSong(playingSong.currentSong);
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
  if (window.innerWidth > 992) return;
  else if (
    e.target.nodeName === "IMG" ||
    e.target.nodeName === "LI" ||
    e.target.nodeName === "SPAN"
  )
    return;
  this.classList.add("expand");
  const closeExpandViewIcon = musicPlayerEl
    .querySelector("#expand-player-view")
    .addEventListener("click", (e) => {
      musicPlayerEl.classList.remove("expand");
      setTimeout(() => {
        musicPlayerEl.addEventListener("click", expandMusicPlayer);
      }, 10);
    });

  if (this.classList.contains("expand")) {
    this.removeEventListener("click", expandMusicPlayer);
  }
}

let allSongsData = [];
async function getSongs() {
  // fetch using base uri for hosting
  let baseURL = document.baseURI;
  const res = await fetch(`./assets/songs/`);
  const result = await res.text();

  const div = document.createElement("div");
  div.innerHTML = result;
  let anchors = div.getElementsByTagName("a");

  for (a of anchors) {
    let songFolder = a.href.split("/songs/")[1];
    if (songFolder) {
      extrectSongData(songFolder);
      async function extrectSongData(folder) {
        const res = await fetch(`./assets/songs/${folder}`);
        const result = await res.text();

        const div = document.createElement("div");
        div.innerHTML = result;
        let allAnchors = div.getElementsByTagName("a");

        for (a of allAnchors) {
          let songMetadataFolder = a.href.split(`/songs/${folder}/`)[1];
          if (songMetadataFolder === "info.json") {
            readInfoFileData(a.href);
            break;
          }
        }
      }
    }
  }
  async function readInfoFileData(infoFile) {
    const res = await fetch(infoFile);
    const data = await res.json();
    addSongs(data);
  }
}
getSongs();

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
musicPlayerEl.addEventListener("click", expandMusicPlayer);
