document.addEventListener("DOMContentLoaded", function () {
    const songs = [
        { title: "Better When I'm Dancin'", src: "song/betterwhenimdancin.mp3" },
        { title: "Strong - One Direction", src: "song/strong.mp3" }
    ];

    let currentSongIndex = 0;
    let isPlaying = false;
    const audio = new Audio(songs[currentSongIndex].src);

    // Elemen
    const enterButton = document.getElementById("enter-button");
    const welcomeScreen = document.getElementById("welcome-screen");
    const toggleMusicBox = document.getElementById("toggle-music-box");
    const musicBox = document.getElementById("music-box");
    const musicTitle = document.getElementById("music-title");
    const playPauseBtn = document.getElementById("play-pause-btn");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");

    // **Tombol Masuk**
    enterButton.addEventListener("click", function () {
        welcomeScreen.style.transition = "opacity 3s ease-out";
        welcomeScreen.style.opacity = "0";

        setTimeout(() => {
            audio.play();
            isPlaying = true;
            musicTitle.textContent = songs[currentSongIndex].title;
            playPauseBtn.textContent = "⏸ Pause";

            // Munculkan music box
            musicBox.classList.add("show");

        }, 200); // Musik mulai setelah 200ms

        setTimeout(() => {
            welcomeScreen.style.display = "none";
        }, 3000);
    });

    // **Toggle Music Box (Tombol 🎵)**
    toggleMusicBox.addEventListener("click", function () {
        musicBox.classList.toggle("show"); // Toggle animasi
    });

    // **Play/Pause Musik**
    playPauseBtn.addEventListener("click", function () {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            playPauseBtn.textContent = "▶ Lanjutkan";
            playPauseBtn.classList.add("paused");
        } else {
            audio.play();
            isPlaying = true;
            playPauseBtn.textContent = "⏸ Pause";
            playPauseBtn.classList.remove("paused");
        }
    });

    // **Next Song**
    nextBtn.addEventListener("click", function () {
        nextSong();
    });

    // **Previous Song**
    prevBtn.addEventListener("click", function () {
        prevSong();
    });

    // **Lanjut ke Lagu Berikutnya Saat Habis**
    audio.addEventListener("ended", function () {
        nextSong();
    });

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length; // Loop ke awal jika sudah di akhir
        playSong();
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Loop ke akhir jika di awal
        playSong();
    }

    function playSong() {
        audio.src = songs[currentSongIndex].src;
        musicTitle.textContent = songs[currentSongIndex].title;
        audio.play();
        isPlaying = true;
        playPauseBtn.textContent = "⏸ Pause";
        playPauseBtn.classList.remove("paused");
    }
});
