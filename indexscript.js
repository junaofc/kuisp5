// Fungsi Loading Aset Website
// Fungsi Loading Aset Website
document.addEventListener("DOMContentLoaded", function () {
    const enterButton = document.getElementById("enter-button");
    enterButton.disabled = true;
    enterButton.textContent = "Memuat 0%";

    let totalAssets = 0;
    let loadedAssets = 0;
    let isAllLoaded = false; // Cegah multiple log "✅ Semua aset berhasil dimuat!"

    // **Daftar Lagu yang Harus Dimuat**
    const songs = [
        { title: "I Always Wanted a Brother - Mufasa", src: "song/ialwayswantedabrother.mp3" },
        { title: "Laskar Pelangi - Nidji", src: "song/laskarpelangi.mp3" },
        { title: "Better When I'm Dancin'", src: "song/betterwhenimdancin.mp3" },
        { title: "Blue - Yung Kai", src: "song/blue.mp3" },
        { title: "Strong - One Direction", src: "song/strong.mp3" },
        { title: "Secukupnya - Hindia", src: "song/secukupnya.mp3" }
    ];

    // **Hitung Total Aset**
    const images = document.images;
    const mediaFiles = document.querySelectorAll("audio, video");

    totalAssets = images.length + mediaFiles.length + songs.length;
    console.log(`🔍 Total Aset: ${totalAssets} (Gambar: ${images.length}, Media: ${mediaFiles.length}, Lagu: ${songs.length})`);

    // **Fungsi Update Loading**
    function updateLoading() {
        if (loadedAssets > totalAssets) loadedAssets = totalAssets; // Batas atas agar tidak lebih dari 100%

        let progress = Math.round((loadedAssets / totalAssets) * 100);
        if (progress > 100) progress = 100; // Mencegah lebih dari 100%
        
        enterButton.textContent = `Memuat ${progress}%`;

        if (progress >= 100 && !isAllLoaded) {
            isAllLoaded = true;
            enterButton.textContent = "Masuk";
            enterButton.classList.add("enabled");
            enterButton.disabled = false;
            console.log("✅ Semua aset berhasil dimuat!");
        }
    }

    // **Preload Gambar**
    for (let img of images) {
        if (img.complete) {
            loadedAssets++;
            console.log(`📷 Gambar termuat: ${img.src}`);
            updateLoading();
        } else {
            img.addEventListener("load", function () {
                loadedAssets++;
                console.log(`📷 Gambar termuat: ${img.src}`);
                updateLoading();
            }, { once: true });

            img.addEventListener("error", function () {
                loadedAssets++;
                console.warn(`⚠️ Gambar gagal dimuat: ${img.src}`);
                updateLoading();
            }, { once: true });
        }
    }

    // **Preload Audio & Video**
    for (let media of mediaFiles) {
        media.addEventListener("loadeddata", function () {
            loadedAssets++;
            console.log(`🎵 Media termuat: ${media.src}`);
            updateLoading();
        }, { once: true });

        media.addEventListener("error", function () {
            loadedAssets++;
            console.warn(`⚠️ Media gagal dimuat: ${media.src}`);
            updateLoading();
        }, { once: true });
    }

    // **Preload Lagu Secara Paksa**
    songs.forEach(song => {
        let audio = new Audio();
        audio.src = song.src;

        audio.addEventListener("canplaythrough", function () {
            loadedAssets++;
            console.log(`🎶 Lagu termuat: ${song.title}`);
            updateLoading();
        }, { once: true });

        audio.addEventListener("error", function () {
            loadedAssets++;
            console.warn(`⚠️ Lagu gagal dimuat: ${song.title}`);
            updateLoading();
        }, { once: true });
    });

    // **Hapus window.onload karena bisa menggandakan loadedAssets**
});

// Fungsi Utama Website
document.addEventListener("DOMContentLoaded", function () {
    const songs = [
        { title: "I Always Wanted a Brother - Mufasa", src: "song/ialwayswantedabrother.mp3" },
        { title: "Laskar Pelangi - Nidji", src: "song/laskarpelangi.mp3" },
        { title: "Better When I'm Dancin'", src: "song/betterwhenimdancin.mp3" },
        { title: "Blue - Yung Kai", src: "song/blue.mp3" },
        { title: "Strong - One Direction", src: "song/strong.mp3" },
        { title: "Secukupnya - Hindia", src: "song/secukupnya.mp3" }
    ];

    let currentSongIndex = 0;
    let isPlaying = false;
    const audio = new Audio(songs[currentSongIndex].src);

    const enterButton = document.getElementById("enter-button");
    const welcomeScreen = document.getElementById("welcome-screen");
    const toggleMusicBox = document.getElementById("toggle-music-box");
    const musicBox = document.getElementById("music-box");
    const musicTitle = document.getElementById("music-title");
    const playPauseBtn = document.getElementById("play-pause-btn");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");

    enterButton.addEventListener("click", function () {
        welcomeScreen.style.transition = "opacity 3s ease-out";
        welcomeScreen.style.opacity = "0";

        setTimeout(() => {
            audio.play().catch(error => console.warn("Autoplay diblokir oleh browser", error));
            isPlaying = true;
            musicTitle.textContent = songs[currentSongIndex].title;
            playPauseBtn.textContent = "⏸ Pause";
            musicBox.classList.add("show");
        }, 200);

        setTimeout(() => {
            welcomeScreen.style.display = "none";
        }, 3000);
    });

    toggleMusicBox.addEventListener("click", function () {
        musicBox.classList.toggle("show");
    });

    playPauseBtn.addEventListener("click", function () {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            playPauseBtn.textContent = "▶ Lanjutkan";
        } else {
            audio.play().catch(error => console.warn("Gagal memulai musik", error));
            isPlaying = true;
            playPauseBtn.textContent = "⏸ Pause";
        }
    });

    nextBtn.addEventListener("click", function () {
        nextSong();
    });

    prevBtn.addEventListener("click", function () {
        prevSong();
    });

    audio.addEventListener("ended", function () {
        nextSong();
    });

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong();
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong();
    }

    function playSong() {
        audio.src = songs[currentSongIndex].src;
        musicTitle.textContent = songs[currentSongIndex].title;
        audio.play().catch(error => console.warn("Gagal memutar lagu", error));
        isPlaying = true;
        playPauseBtn.textContent = "⏸ Pause";
    }
});
