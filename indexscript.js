// Fungsi Loading Aset Website
document.addEventListener("DOMContentLoaded", function () {
    const enterButton = document.getElementById("enter-button");
    enterButton.disabled = true;
    enterButton.textContent = "Memuat 0%";

    let progress = 0;
    let totalAssets = 0;
    let loadedAssets = 0;

    // Cek semua gambar di halaman
    const images = document.images;
    totalAssets += images.length;

    // Cek semua audio & video
    const mediaFiles = document.querySelectorAll('audio, video');
    totalAssets += mediaFiles.length;

    console.log(`🔍 Total Aset yang Dimuat: ${totalAssets} (Gambar: ${images.length}, Media: ${mediaFiles.length})`);

    // Fungsi untuk update loading
    function updateLoading() {
        progress = Math.round((loadedAssets / totalAssets) * 100);
        enterButton.textContent = `Memuat ${progress}%`;

        if (progress >= 100) {
            enterButton.textContent = "Masuk";
            enterButton.classList.add("enabled");
            enterButton.disabled = false;
            console.log("✅ Semua aset berhasil dimuat!");
        }
    }

    // **Cek Gambar**
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
            });
            img.addEventListener("error", function () {
                loadedAssets++;
                console.warn(`⚠️ Gambar gagal dimuat: ${img.src}`);
                updateLoading();
            });
        }
    }

    // **Cek Audio & Video**
    for (let media of mediaFiles) {
        media.addEventListener("loadeddata", function () {
            loadedAssets++;
            console.log(`🎵 Media termuat: ${media.src}`);
            updateLoading();
        });

        media.addEventListener("error", function () {
            loadedAssets++;
            console.warn(`⚠️ Media gagal dimuat: ${media.src}`);
            updateLoading();
        });
    }

    // **Pastikan semua aset lain juga termuat**
    window.onload = function () {
        loadedAssets = totalAssets;
        updateLoading();
    };
});


// Fungsi Utama Website
document.addEventListener("DOMContentLoaded", function () {
    const songs = [
        { title: "I Always Wanted a Brother - Mufasa", src: "song/ialwayswantedabrother.mp3" },
        { title: "Laskar Pelangi - Nidji", src: "song/laskarpelangi.mp3" },
        { title: "Better When I'm Dancin'", src: "song/betterwhenimdancin.mp3" },
        { title: "Blue - Yung kai", src: "song/blue.mp3" },
        { title: "Strong - One Direction", src: "song/strong.mp3" },
        { title: "Secukupnya - Hindia", src: "song/secukupnya.mp3" }
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
