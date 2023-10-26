const image = document.querySelector("img");
const title = document.getElementById("Title");
const artist = document.getElementById("Artist");
const music = document.querySelector("audio");
const volumeSlider = document.getElementById("Volume");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("Prev");
const playBtn = document.getElementById("Start");
const nextBtn = document.getElementById("Next");
const repeatBtn = document.getElementById("Repeat");
const shuffleBtn = document.getElementById("Shuffle");

// Set the initial volume
music.volume = volumeSlider.value;

// Update the volume when the slider is changed
volumeSlider.addEventListener("input", () => {
  const volumeValue = parseFloat(volumeSlider.value);
  music.volume = volumeValue;
});

// music
const songs = [
  {
    title: "dw-1",
    displayName: "Good Morning Africa",
    artist: "Bruklyn",
  },

  {
    title: "dw-2",
    displayName: "LELE",
    artist: "YBW",
  },

  {
    title: "dw-3",
    displayName: "Sewersydaa Freestyle",
    artist: "Wakadinali",
  },

  {
    title: "dw-15",
    displayName: "Big Fat Cheque  ",
    artist: " BREEDER LW",
  },
  {
    title: "dw-16",
    displayName: "Case Closed ",
    artist: "Wakadinali",
  },
  {
    title: "dw-17",
    displayName: "CHACHA SLIDE",
    artist: "Mrright Buruklynboyz ",
  },
  {
    title: "dw-18",
    displayName: "NAIROBI ",
    artist: "Buruklynboyz ",
  },
  {
    title: "dw-19",
    displayName: "NGWAI",
    artist: "ilmaina  ",
  },
  {
    title: "dw-20",
    displayName: "Manyas",
    artist: "Buruklynboyz ",
  },
  {
    title: "dw-4",
    displayName: "Kiss Me Thru The Phone ",
    artist: "Soulja Boy ft Sammie",
  },
  {
    title: "dw-5",
    displayName: " Crank That Soulja Boy ",
    artist: "Soulja Boy Tellem ",
  },
  {
    title: "dw-6",
    displayName: "Still DRE ",
    artist: "Dr Dre ft Snoop Dogg",
  },
  {
    title: "dw-7",
    displayName: "No Love Explicit Version ",
    artist: " Eminem ft Lil Wayne ",
  },
  {
    title: "dw-8",
    displayName: "A Milli",
    artist: "Lil Wayne  ",
  },
  {
    title: "dw-9",
    displayName: "Hot Ngga ",
    artist: " Bobby Shmurda ",
  },
  {
    title: "dw-10",
    displayName: "Its Goin Down",
    artist: "Yung Joc",
  },
  {
    title: "dw-11",
    displayName: " The Streets OST  Mail On Sunday",
    artist: " Flo Rida ",
  },
  {
    title: "dw-12",
    displayName: "Whatever You Like ",
    artist: "TI",
  },
  {
    title: "dw-13",
    displayName: " Only",
    artist: " Minaj Drake Lil.W Chris.B. ",
  },
  {
    title: "dw-14",
    displayName: "Get Low ",
    artist: " The East Side Boyz Ying ",
  },
];
// Initialize the currentSongIndex from localStorage or default to 0
let currentSongIndex = parseInt(localStorage.getItem("currentSongIndex")) || 0;

// Function to save the currently playing song index to localStorage
function saveCurrentSongIndex() {
  localStorage.setItem("currentSongIndex", currentSongIndex.toString());
}

// Check if playing
let isPlaying = false;

// Function to play the music and toggle the spinning animation
function playMusic() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
  music.play();
  image.classList.add("spin-animation");
  saveCurrentSongIndex();
}

// Function to pause the music and stop the spinning animation
function pauseMusic() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
  music.pause();
  image.classList.remove("spin-animation");
  saveCurrentSongIndex();
}

// Play or pause event listener
playBtn.addEventListener("click", () =>
  isPlaying ? pauseMusic() : playMusic()
);

// Load the currently playing song on page load
loadMusic(songs[currentSongIndex]);

// Update the DOM
function loadMusic(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `Music/${song.title}.mp3`;
  image.src = `img/${song.title}.jpg`;
}

// Previous song
function prevMusic() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  loadMusic(songs[currentSongIndex]);
  playMusic();
}

// Next song
function nextMusic() {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }
  loadMusic(songs[currentSongIndex]);
  playMusic();
}

// Update progress bar and time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set progress bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

let isRepeat = false;
let isShuffle = false;

// Toggle the repeat state
function toggleRepeat() {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle("active", isRepeat);
}

// Toggle the shuffle state
function toggleShuffle() {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);
}

// Function to play the next song considering the shuffle state
function playNextSong() {
  if (isShuffle) {
    currentSongIndex = (currentSongIndex + 2) % songs.length;
  } else {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
      currentSongIndex = 0;
    }
  }
  loadMusic(songs[currentSongIndex]);
  playMusic();
}

// Update the event listener for the 'ended' event to consider repeat and shuffle
music.addEventListener("ended", () => {
  if (isRepeat) {
    music.currentTime = 0;
    playMusic();
  } else {
    playNextSong();
  }
});

// Event Listeners
prevBtn.addEventListener("click", prevMusic);
nextBtn.addEventListener("click", nextMusic);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
repeatBtn.addEventListener("click", toggleRepeat);
shuffleBtn.addEventListener("click", toggleShuffle);
