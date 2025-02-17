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
        question: "Hasil dari 15² adalah...", 
        options: ["215", "225", "235", "250"], 
        answer: 1 // 225
    },
    { 
        question: "Hasil dari (5x)² adalah...", 
        options: ["10x²", "15x²", "25 • x²", "5x²"], 
        answer: 2 // 25 • x²
    },
    { 
        question: "Hasil dari 12⁷ × 12⁴ adalah...", 
        options: ["12⁹", "12¹¹", "12¹²", "12¹⁰"], 
        answer: 1 // 12¹¹
    },
    { 
        question: "Hasil dari 3⁷ : 3⁴ adalah...", 
        options: ["3²", "3³", "3⁵", "3⁴"], 
        answer: 1 // 3³
    },
    { 
        question: "Hasil dari √49 adalah...", 
        options: ["6", "7", "8", "9"], 
        answer: 1 // 7
    },
    { 
        question: "Hasil dari √1.800 adalah...", 
        options: ["30 √2", "40 √2", "35 √2", "25 √2"], 
        answer: 0 // 30 √2
    },
    { 
        question: "Hasil dari 1,54 × 10⁵ adalah...", 
        options: ["1.540", "15.400", "154.000", "1.540.000"], 
        answer: 2 // 154.000
    },
    { 
        question: "Manakah yang termasuk dalam tripel Pythagoras?", 
        options: ["6, 8, 10", "7, 24, 25", "5, 12, 14", "9, 15, 20"], 
        answer: 1 // 7, 24, 25
    },
    { 
        question: "Jika 2x + 5 = 19, berapa nilai x?", 
        options: ["5", "6", "7", "8"], 
        answer: 2 // 7
    },
    { 
        question: "Jika 6x + 5 = 26 - x, berapa nilai x?", 
        options: ["2", "3", "4", "5"], 
        answer: 1 // 3
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
