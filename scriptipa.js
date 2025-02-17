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
        question: "Manakah yang merupakan alat yang digunakan untuk mengamati sel?", 
        options: ["Mikroskop", "Stetoskop", "Mikrofon", "Teleskop"], 
        answer: 0 // A
    },
    { 
        question: "Siapakah pencipta Mikroskop?", 
        options: ["Nikola Tesla", "Robert Hooke", "Yuri Gagarin", "Oppenheimer"], 
        answer: 1 // C → B (diacak)
    },
    { 
        question: "Mitokondria adalah sel yang berfungsi untuk?", 
        options: ["Melindungi sel", "Membuat protein", "Sebagai tempat penyimpanan", "Memproduksi energi"], 
        answer: 3 // B → D (diacak)
    },
    { 
        question: "Proses pencernaan di mulut dilakukan dengan cara...", 
        options: ["Mekanik dan Kimiawi", "Mekanik saja", "Kimiawi dan fisika", "Mekanik dan elektronik"], 
        answer: 0 // A
    },
    { 
        question: "Di ludah terdapat suatu enzim yang disebut?", 
        options: ["Amilase/Ptialin", "Pepsin", "Canivus", "Maltosa"], 
        answer: 0 // D → A (diacak)
    },
    { 
        question: "Fungsi Sel Nefron adalah?", 
        options: ["Penghasil lemak", "Membuat keringat", "Penghasil sel", "Pembuatan Urin"], 
        answer: 3 // B → D (diacak)
    },
    { 
        question: "Sebuah bandul melakukan 60 getaran dalam 1 menit. Berapa frekuensinya?", 
        options: ["1 Hz", "2 Hz", "3 Hz", "5 Hz"], 
        answer: 0 // C → A (diacak)
    },
    { 
        question: "Jika panjang gelombang tali = 8m digerakkan dengan waktu 2 sekon. Berapa cepat rambat gelombangnya?", 
        options: ["3 m/s", "4 m/s", "5 m/s", "7 m/s"], 
        answer: 1 // A → B (diacak)
    },
    { 
        question: "Bunyi yang dapat didengar manusia adalah?", 
        options: ["Ultrasonik", "Audiosonik", "Infrasonik", "Semuanya benar"], 
        answer: 1 // B
    },
    { 
        question: "Seorang petualang berteriak keras di depan Goa sepanjang 3.000 m. Jika pantulan bunyi diterima 4 sekon, berapa cepat rambat bunyi dalam Goa?", 
        options: ["750", "670", "500", "300"], 
        answer: 0 // C → A (diacak)
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
