let startTime;
let timerInterval;
let currentPromptIndex = 0;
let testDuration = 1 * 60; 
let elapsedTime = 0;
let isPaused = false;

document.addEventListener('DOMContentLoaded', () => {
  const typingArea = document.getElementById('typing-area');
  const startButton = document.getElementById('start-button');
  const pauseButton = document.getElementById('pause-button');
  const timeDisplay = document.getElementById('time');
  const wpmDisplay = document.getElementById('wpm');
  const cpmDisplay = document.getElementById('cpm');
  const accuracyDisplay = document.getElementById('accuracy');
  const promptText = document.getElementById('prompt-text');

  const prompts = [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "How razorback-jumping frogs can level six piqued gymnasts!",
    "A quick movement of the enemy will jeopardize six gunboats.",
    "Grumpy wizards make toxic brew for the evil Queen and Jack.",
    "Jinxed wizards pluck ivy from the big quilt.",
    "Crazy Fredrick bought many very exquisite opal jewels.",
    "The five boxing wizards jump quickly.",
    "Sphinx of black quartz, judge my vow.",
    "The quick onyx goblin jumps over the lazy dwarf.",
    "Jackdaws love my big sphinx of quartz.",
    "The five boxing wizards jump quickly.",
    "Quick zephyrs blow, vexing daft Jim.",
    "Sphinx of black quartz, judge my vow.",
    "How vexingly quick daft zebras jump!",
    "Bright vixens jump; dozy fowl quack.",
    "Quick wafting zephyrs vex bold Jim.",
    "Quick zephyrs blow, vexing daft Jim.",
    "Two driven jocks help fax my big quiz.",
    "Five quacking zephyrs jolt my wax bed."
  ];

  startButton.addEventListener('click', () => {
    if (startButton.textContent === "Start Test") {
      startButton.textContent = "Restart";
      pauseButton.style.display = "inline-block";
      startTypingTest();
    } else {
      clearInterval(timerInterval);
      resetTypingTest();
      startTypingTest();
    }
  });

  pauseButton.addEventListener('click', () => {
    if (isPaused) {
      resumeTest();
    } else {
      pauseTest();
    }
  });

  typingArea.addEventListener('input', () => {
    if (!isPaused) {
      updateStats();
      highlightErrors();
    }
  });

  typingArea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (typingArea.value.trim() === promptText.textContent.trim()) {
        nextPrompt();
      }
    }
  });

  function startTypingTest() {
    currentPromptIndex = 0;
    elapsedTime = 0;
    isPaused = false;
    setNextPrompt();
    typingArea.value = "";
    typingArea.disabled = false;
    typingArea.focus();
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
    pauseButton.textContent = "Pause";
  }

  function resetTypingTest() {
    clearInterval(timerInterval);
    timeDisplay.textContent = formatTime(testDuration);
    wpmDisplay.textContent = "0";
    cpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "0";
    promptText.textContent = "Press 'Start Test' to begin...";
    typingArea.value = "";
    typingArea.disabled = true;
    pauseButton.style.display = "none";
    isPaused = false;
  }
