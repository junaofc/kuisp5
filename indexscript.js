document.addEventListener("DOMContentLoaded", function () {
    const enterButton = document.getElementById("enter-button");
    const welcomeScreen = document.getElementById("welcome-screen");
    const toggleMusicBox = document.getElementById("toggle-music-box");
    const musicBox = document.getElementById("music-box");
    const musicTitle = document.getElementById("music-title");
    const playPauseBtn = document.getElementById("play-pause-btn");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");

    enterButton.disabled = true;
    enterButton.textContent = "Memuat 0%";

    let songs = [
        { title: "I Always Wanted a Brother - Mufasa", src: "song/ialwayswantedabrother.mp3" },
        { title: "Laskar Pelangi - Nidji", src: "song/laskarpelangi.mp3" },
        { title: "Better When I'm Dancin'", src: "song/betterwhenimdancin.mp3" },
        { title: "Blue - Yung Kai", src: "song/blue.mp3" },
        { title: "Strong - One Direction", src: "song/strong.mp3" },
        { title: "Secukupnya - Hindia", src: "song/secukupnya.mp3" }
    ];

    let totalAssets = document.images.length + songs.length;
    let loadedAssets = 0;
    let isAllLoaded = false;
    let currentSongIndex = 0;
    let isPlaying = false;
    let isChangingSong = false;
    const audio = new Audio();

    // **Update Loading Progress**
    function updateLoading() {
        let progress = Math.round((loadedAssets / totalAssets) * 100);
        if (progress > 100) progress = 100;

        enterButton.textContent = `Memuat ${progress}%`;

        if (progress >= 100 && !isAllLoaded) {
            isAllLoaded = true;
            enterButton.textContent = "Masuk";
            enterButton.disabled = false;
            enterButton.classList.add("enabled");
            console.log("✅ Semua aset berhasil dimuat!");
        }
    }

    // **Preload Gambar**
    for (let img of document.images) {
        if (img.complete) {
            loadedAssets++;
            updateLoading();
        } else {
            img.addEventListener("load", function () {
                loadedAssets++;
                updateLoading();
            }, { once: true });

            img.addEventListener("error", function () {
                loadedAssets++;
                console.warn(`⚠️ Gagal memuat gambar: ${img.src}`);
                updateLoading();
            }, { once: true });
        }
    }

    // **Preload Lagu**
    songs.forEach(song => {
        let preloadAudio = new Audio();
        preloadAudio.src = song.src;

        preloadAudio.addEventListener("canplaythrough", function () {
            loadedAssets++;
            updateLoading();
        }, { once: true });

        preloadAudio.addEventListener("error", function () {
            loadedAssets++;
            console.warn(`⚠️ Gagal memuat lagu: ${song.title}`);
            updateLoading();
        }, { once: true });
    });

    // **Fungsi Play Lagu**
    function playSong(index) {
        if (isChangingSong) return;
        isChangingSong = true;

        audio.pause();
        audio.currentTime = 0;
        audio.src = songs[index].src;
        audio.load();

        audio.addEventListener("canplaythrough", function () {
            audio.play().catch(error => console.warn("⚠️ Gagal memutar lagu:", error));
            isPlaying = true;
            musicTitle.textContent = songs[index].title;
            playPauseBtn.textContent = "⏸ Pause";
            isChangingSong = false;
        }, { once: true });
    }

    // **Tombol Masuk**
    enterButton.addEventListener("click", function () {
        welcomeScreen.style.transition = "opacity 3s ease-out";
        welcomeScreen.style.opacity = "0";

        setTimeout(() => {
            playSong(currentSongIndex);
            musicBox.classList.add("show");
        }, 200);

        setTimeout(() => {
            welcomeScreen.style.display = "none";
        }, 3000);
    });

    // **Tombol Toggle Musik**
    toggleMusicBox.addEventListener("click", function () {
        musicBox.classList.toggle("show");
    });

    // **Tombol Play/Pause**
    playPauseBtn.addEventListener("click", function () {
        if (audio.paused) {
            audio.play().catch(error => console.warn("⚠️ Gagal memulai musik", error));
            isPlaying = true;
            playPauseBtn.textContent = "⏸ Pause";
        } else {
            audio.pause();
            isPlaying = false;
            playPauseBtn.textContent = "▶ Lanjutkan";
        }
    });

    // **Tombol Next**
    nextBtn.addEventListener("click", function () {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(currentSongIndex);
    });

    // **Tombol Previous**
    prevBtn.addEventListener("click", function () {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(currentSongIndex);
    });

    // **Lanjut ke Lagu Berikutnya Otomatis**
    audio.addEventListener("ended", function () {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(currentSongIndex);
    });
});
