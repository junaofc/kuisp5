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
    { question: "Apa ibu kota Indonesia?", options: ["Jakarta", "Surabaya", "Medan", "Bandung"], answer: 0 },
    { question: "Berapa hasil dari 5 + 3?", options: ["6", "8", "9", "7"], answer: 1 },
    { question: "Siapa presiden pertama Indonesia?", options: ["Soekarno", "Soeharto", "Habibie", "Jokowi"], answer: 0 },
    { question: "Berapakah 10 × 2?", options: ["20", "10", "15", "25"], answer: 0 },
    { question: "Apa warna langit pada siang hari?", options: ["Merah", "Hijau", "Biru", "Kuning"], answer: 2 },
    { question: "Siapa pencipta teori gravitasi?", options: ["Newton", "Einstein", "Galileo", "Tesla"], answer: 0 },
    { question: "Gunung tertinggi di dunia?", options: ["Everest", "Merapi", "Kilimanjaro", "Elbrus"], answer: 0 },
    { question: "Apa kepanjangan dari WWW?", options: ["World Wide Web", "Wild Wild West", "Windows Web Work", "Web World Wide"], answer: 0 },
    { question: "Siapa penemu bola lampu?", options: ["Edison", "Tesla", "Newton", "Galileo"], answer: 0 },
    { question: "Apa simbol kimia untuk air?", options: ["H2O", "O2", "CO2", "H2"], answer: 0 }
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