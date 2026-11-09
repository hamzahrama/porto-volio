// Track database with YouTube video IDs
const tracks = [
    { title: 'Negoro Angin', artist: 'Ajeng Febria', duration: 425, youtubeId: 'b8jNeQT81Go' },
    { title: 'A Little Piece of Heaven', artist: 'Avenged Sevenfold', duration: 482, youtubeId: 'onCZOgWlr1U' },
    { title: 'Amnesia', artist: 'Al Ghazali', duration: 451, youtubeId: 'ImolMMYj-V8' },
    { title: 'Aku, Kamu dan Samudra', artist: 'Rebellion Rose', duration: 323, youtubeId: 'EjCKw5Ixvh4' },
    { title: 'Surat Cinta untuk Starla', artist: 'Virgoun', duration: 287, youtubeId: 'FocFked1TbQ' },
    { title: 'Wanita Munafik', artist: 'Sejedewe', duration: 208, youtubeId: '4VXZQ5OaZUs' },
    { title: 'Sehat Selalu Saudaraku', artist: 'Rebellion Rose', duration: 276, youtubeId: 'hOgNFE_13M4' },
    { title: 'Aku Sedang Melayang', artist: 'Stand Here Alone', duration: 308, youtubeId: '1W1aLFmMhic' },
    { title: 'Tertanam', artist: 'Tony Q Rastafara', duration: 205, youtubeId: 'Nf1v3rXxCqo' },
    { title: 'Cinta di Pantai Bali', artist: 'Sejedewe', duration: 322, youtubeId: 'r0FUiSYRsk8' },
    { title: 'Argata (Romi Jahat)', artist: 'Romi Jahat', duration: 180, youtubeId: 'regpMUquCPY' }
];

// Player state
let currentTrackIndex = -1;
let isPlaying = false;
let currentTime = 0;
let isRepeat = false;
let isShuffle = false;
let volume = 70;
let player = null;

// DOM elements
const btnPlay = document.getElementById('btnPlay');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const btnRepeat = document.getElementById('btnRepeat');
const btnShuffle = document.getElementById('btnShuffle');
const nowPlayingTitle = document.getElementById('nowPlayingTitle');
const nowPlayingArtist = document.getElementById('nowPlayingArtist');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const progressSlider = document.getElementById('progressSlider');
const progressFilled = document.getElementById('progressFilled');
const volumeSlider = document.getElementById('volumeSlider');
const trackItems = document.querySelectorAll('.track-item');

// Format time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Initialize YouTube player (hidden)
function initPlayer() {
    const playerContainer = document.createElement('div');
    playerContainer.id = 'youtube-player';
    playerContainer.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;';
    document.body.appendChild(playerContainer);
    
    player = new YT.Player('youtube-player', {
        height: '1',
        width: '1',
        videoId: '',
        playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            playsinline: 1
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
}

// Called by YouTube API when ready
window.onYouTubeIframeAPIReady = function() {
    initPlayer();
};

function onPlayerReady(event) {
    event.target.setVolume(volume);
    console.log('YouTube Player Ready');
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        if (isRepeat) {
            player.seekTo(0);
            player.playVideo();
        } else {
            nextTrack();
        }
    } else if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        btnPlay.textContent = '⏸️';
        startProgressFromYouTube();
    } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
        btnPlay.textContent = '▶️';
        clearInterval(progressInterval);
    }
}

// Load track
function loadTrack(index) {
    if (index < 0 || index >= tracks.length) return;
    
    currentTrackIndex = index;
    const track = tracks[index];
    
    nowPlayingTitle.textContent = track.title;
    nowPlayingArtist.textContent = track.artist;
    totalTimeEl.textContent = formatTime(track.duration);
    currentTime = 0;
    currentTimeEl.textContent = formatTime(0);
    progressSlider.value = 0;
    progressFilled.style.width = '0%';
    
    // Update active track UI
    trackItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active', 'playing');
        } else {
            item.classList.remove('active', 'playing');
        }
    });
    
    // Load video into YouTube player
    if (player) {
        player.loadVideoById(track.youtubeId);
    }
}

// Play/Pause
function togglePlay() {
    if (currentTrackIndex === -1) {
        loadTrack(0);
    }
    
    if (!player) {
        console.log('YouTube player not ready');
        return;
    }
    
    if (isPlaying) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

// Progress update from YouTube player
let progressInterval;

function startProgressFromYouTube() {
    clearInterval(progressInterval);
    
    progressInterval = setInterval(() => {
        if (!isPlaying || !player) return;
        
        const track = tracks[currentTrackIndex];
        currentTime = player.getCurrentTime();
        
        currentTimeEl.textContent = formatTime(currentTime);
        const progress = (currentTime / track.duration) * 100;
        progressSlider.value = Math.min(progress, 100);
        progressFilled.style.width = Math.min(progress, 100) + '%';
        
        if (currentTime >= track.duration) {
            clearInterval(progressInterval);
        }
    }, 500);
}

// Next track
function nextTrack() {
    let nextIndex;
    
    if (isShuffle) {
        do {
            nextIndex = Math.floor(Math.random() * tracks.length);
        } while (nextIndex === currentTrackIndex && tracks.length > 1);
    } else {
        nextIndex = (currentTrackIndex + 1) % tracks.length;
    }
    
    loadTrack(nextIndex);
    // Player will auto-play due to loadVideoById
}

// Previous track
function prevTrack() {
    if (currentTime > 3) {
        player.seekTo(0);
    } else {
        let prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(prevIndex);
    }
}

// Toggle repeat
function toggleRepeat() {
    isRepeat = !isRepeat;
    btnRepeat.classList.toggle('active', isRepeat);
}

// Toggle shuffle
function toggleShuffle() {
    isShuffle = !isShuffle;
    btnShuffle.classList.toggle('active', isShuffle);
}

// Seek
progressSlider.addEventListener('input', (e) => {
    const track = tracks[currentTrackIndex];
    if (!track || !player) return;
    
    const seekPercent = e.target.value;
    const seekTime = (seekPercent / 100) * track.duration;
    player.seekTo(seekTime, true);
    currentTime = seekTime;
    currentTimeEl.textContent = formatTime(currentTime);
    progressFilled.style.width = seekPercent + '%';
});

// Volume
volumeSlider.addEventListener('input', (e) => {
    volume = e.target.value;
    if (player) {
        player.setVolume(volume);
    }
});

// Track click
trackItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        loadTrack(index);
        // Player will start playing after load
    });
});

// Button events
btnPlay.addEventListener('click', togglePlay);
btnNext.addEventListener('click', nextTrack);
btnPrev.addEventListener('click', prevTrack);
btnRepeat.addEventListener('click', toggleRepeat);
btnShuffle.addEventListener('click', toggleShuffle);

// Like button
document.querySelector('.btn-like').addEventListener('click', function() {
    this.classList.toggle('active');
    this.textContent = this.classList.contains('active') ? '❤️' : '♡';
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
    } else if (e.code === 'ArrowRight') {
        nextTrack();
    } else if (e.code === 'ArrowLeft') {
        prevTrack();
    }
});

// Initialize YouTube API on load
// Called via window.onYouTubeIframeAPIReady in HTML