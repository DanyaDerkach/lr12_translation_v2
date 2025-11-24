$(document).ready(function() {
    const wordSets = {
        easy: [
            { ua: "кіт", en: "cat" },
            { ua: "собака", en: "dog" },
            { ua: "будинок", en: "house" },
            { ua: "сонце", en: "sun" },
            { ua: "книга", en: "book" },
            { ua: "вода", en: "water" },
            { ua: "їсти", en: "eat" },
            { ua: "спати", en: "sleep" },
            { ua: "бігти", en: "run" },
            { ua: "зелений", en: "green" }
        ],
        medium: [
            { ua: "подорож", en: "travel" },
            { ua: "комп'ютер", en: "computer" },
            { ua: "щастя", en: "happiness" },
            { ua: "складний", en: "difficult" },
            { ua: "дослідження", en: "research" },
            { ua: "можливість", en: "opportunity" },
            { ua: "створювати", en: "create" },
            { ua: "вирішувати", en: "solve" },
            { ua: "цікавий", en: "interesting" },
            { ua: "визначення", en: "definition" }
        ],
        hard: [
            { ua: "інтеграція", en: "integration" },
            { ua: "парадигма", en: "paradigm" },
            { ua: "ефективність", en: "efficiency" },
            { ua: "амбівалентність", en: "ambivalence" },
            { ua: "співвідношення", en: "correlation" },
            { ua: "критичний", en: "critical" },
            { ua: "систематичний", en: "systematic" },
            { ua: "усвідомлення", en: "awareness" },
            { ua: "глобалізація", en: "globalization" },
            { ua: "гіпотеза", en: "hypothesis" }
        ]
    };

    const TOTAL_WORDS = 10;
    let currentWords = [];
    let currentWordIndex = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let gameStarted = false;

    function updateCount() {
        $('#count').text(`${currentWordIndex + 1}/${TOTAL_WORDS}`);
    }

    function updateStatistics() {
        $('#correctCount').text(`Правильних: ${correctCount}`);
        $('#incorrectCount').text(`Неправильних: ${incorrectCount}`);
    }

    function nextWord() {
        if (currentWordIndex >= TOTAL_WORDS) {
            endGame();
            return;
        }

        $('#word').text(currentWords[currentWordIndex].ua);
        $('#inputWord').val('').focus();
        updateCount();
    }

    function startGame(difficulty) {
        let selectedSet = wordSets[difficulty];

        currentWords = selectedSet
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
            .slice(0, TOTAL_WORDS);

        currentWordIndex = 0;
        correctCount = 0;
        incorrectCount = 0;
        gameStarted = true;

        updateStatistics();
        $('#dificulty').hide();
        $('#content').show();
        
        nextWord();
    }

    function checkAnswer() {
        if (!gameStarted || currentWordIndex >= TOTAL_WORDS) {
            return;
        }

        const userAnswer = $('#inputWord').val().trim().toLowerCase();
        const correctAnswer = currentWords[currentWordIndex].en.toLowerCase();

        if (userAnswer === correctAnswer) {
            correctCount++;
        } else {
            incorrectCount++;
        }

        updateStatistics();
        currentWordIndex++;
        nextWord();
    }

    function endGame() {
        gameStarted = false;
        alert(`Гра завершена! \n\nВи молодець і правильно переклали ${correctCount} слів із ${TOTAL_WORDS}.`);

        $('#content').hide();
        $('#dificulty').show();
    }

    $('#content').hide();

    $('#content button').on('click', checkAnswer);

    $('#inputWord').on('keypress', function(e) {
        if (e.which === 13) {
            checkAnswer();
        }
    });

    $('#dificulty input[name="difficulty"]').on('change', function() {
        const difficulty = $(this).val();
        startGame(difficulty);
    });

    const initialDifficulty = $('#dificulty input[name="difficulty"]:checked').val();
    if (initialDifficulty) {
    }
});