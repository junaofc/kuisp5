document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("start-btn").addEventListener("click", function () {
        let playerName = document.getElementById("player-name").value.trim();
        if (playerName === "") {
            alert("Masukkan nama terlebih dahulu!");
            return;
        }
        document.getElementById("start-screen").style.display = "none";
        document.getElementById("quiz-container").style.display = "block";
        loadQuestion();
    });
});



const questions = [
    { 
        question: "Slogan yang baik biasanya memiliki ciri-ciri berikut, kecuali", 
        options: ["Singkat dan padat", "Mudah diingat", "Menggunakan bahasa yang rumit", "Menarik dan relevan dengan produk"], 
        answer: 2 // C
    },
    { 
        question: "Mengapa penting untuk memilih warna yang tepat dalam desain poster?", 
        options: ["Agar poster terlihat cerah", "Untuk menambahkan biaya desain", "Warna tidak berpengaruh", "Warna yang tepat dapat mempengaruhi suasana dan menarik perhatian"], 
        answer: 3 // D
    },
    { 
        question: "Dalam pembuatan poster, elemen manakah yang berfungsi untuk menarik perhatian?", 
        options: ["Gambar", "Alamat", "Tanggal", "Logo"], 
        answer: 0 // A
    },
    { 
        question: "Apa yang harus diperhatikan dalam pemilihan font untuk poster?", 
        options: ["Font yang sulit dibaca", "Font yang terlalu kecil", "Font yang sesuai dengan tema dan mudah dibaca", "Font yang mirip dengan desain iklan"], 
        answer: 2 // C
    },
    { 
        question: "Slogan dari produk 'Pepsi' adalah:", 
        options: ["Live for now", "Just Do It", "Coke is it", "Taste the feeling"], 
        answer: 0 // A
    },
    { 
        question: "Dalam iklan, apa yang biasanya menciptakan kesan pertama yang kuat?", 
        options: ["Visual dan headline", "Harga", "Testimoni", "Informasi produk"], 
        answer: 0 // A
    },
    { 
        question: "Apa yang dimaksud dengan 'branding' dalam konteks iklan?", 
        options: ["Menjual produk dengan harga rendah", "Membuat iklan dalam berbagai media", "Mengembangkan strategi pemasaran jangka panjang untuk membangun citra merek", "Menciptakan logo baru"], 
        answer: 2 // C
    },
    { 
        question: "Apa yang harus dilakukan sebelum mulai mendesain poster?", 
        options: ["Menentukan ukuran kertas", "Memahami tujuan dan audiens", "Memilih font yang paling berwarna", "Menentukan harga"], 
        answer: 1 // B
    },
    { 
        question: "Apa yang biasanya menjadi fokus utama dalam sebuah iklan televisi?", 
        options: ["Musik latar", "Cerita yang menarik dan visual yang kuat", "Ukuran produk", "Harga produk"], 
        answer: 1 // B
    },
    { 
        question: "Apa yang penting dalam membuat slogan?", 
        options: ["Panjang dan rumit", "Mudah diucapkan dan berima", "Tidak relevan dengan produk", "Menggunakan bahasa teknis"], 
        answer: 1 // B
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        document.getElementById("quiz-container").style.display = "none";
        document.getElementById("result-screen").style.display = "block";
        document.getElementById("result-text").textContent = `Skor Anda: ${score} dari ${questions.length}`;
        return;
    }

    let q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;
    let options = document.getElementsByClassName("option");

    for (let i = 0; i < options.length; i++) {
        options[i].textContent = q.options[i];
        options[i].classList.remove("correct", "wrong");
        options[i].disabled = false;
    }
}

function checkAnswer(selectedIndex) {
    let correctIndex = questions[currentQuestion].answer;
    let options = document.getElementsByClassName("option");
    let benarOverlay = document.querySelector(".jawabanbenar");
    let salahOverlay = document.querySelector(".jawabansalah");

    if (selectedIndex === correctIndex) {
        options[selectedIndex].classList.add("correct");
        benarOverlay.style.display = "flex";
        score++;
    } else {
        options[selectedIndex].classList.add("wrong");
        options[correctIndex].classList.add("correct");
        salahOverlay.style.display = "flex";
    }

    setTimeout(() => {
        benarOverlay.style.display = "none";
        salahOverlay.style.display = "none";
        currentQuestion++;
        loadQuestion();
    }, 1000);
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("result-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
    document.getElementById("player-name").value = "";
}
