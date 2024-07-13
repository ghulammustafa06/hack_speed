document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const learnMoreButtons = document.querySelectorAll('.learn-more');

    window.addEventListener('scroll', () => {
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            if (cardTop < screenHeight * 0.8) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });

    const gameContainer = document.createElement('div');
    gameContainer.id = 'typing-game';
    gameContainer.innerHTML = `
        <h3>Quick Typing Game</h3>
        <p id="game-text"></p>
        <input type="text" id="game-input" placeholder="Type the text above">
        <p id="game-result"></p>
    `;
    document.querySelector('main').appendChild(gameContainer);

    const gameText = document.getElementById('game-text');
    const gameInput = document.getElementById('game-input');
    const gameResult = document.getElementById('game-result');

    const texts = [
        "The quick brown fox jumps over the lazy dog",
        "Pack my box with five dozen liquor jugs",
        "How vexingly quick daft zebras jump"
    ];

    let currentText = '';

    function startGame() {
        currentText = texts[Math.floor(Math.random() * texts.length)];
        gameText.textContent = currentText;
        gameInput.value = '';
        gameResult.textContent = '';
    }

    gameInput.addEventListener('input', () => {
        if (gameInput.value === currentText) {
            gameResult.textContent = 'Correct! Well done!';
            setTimeout(startGame, 2000);
        }
    });

    startGame();
});
