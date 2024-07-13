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

  function pauseTest() {
    clearInterval(timerInterval);
    typingArea.disabled = true;
    isPaused = true;
    pauseButton.textContent = "Resume";
  }

  function resumeTest() {
    startTime = new Date().getTime() - elapsedTime * 1000;
    timerInterval = setInterval(updateTimer, 1000);
    typingArea.disabled = false;
    typingArea.focus();
    isPaused = false;
    pauseButton.textContent = "Pause";
  }

  function updateTimer() {
    elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
    const remainingTime = Math.max(0, testDuration - elapsedTime);
    timeDisplay.textContent = formatTime(remainingTime);

    if (remainingTime === 0) {
      clearInterval(timerInterval);
      typingArea.disabled = true;
      startButton.textContent = "Start Test";
      pauseButton.style.display = "none";
    }
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  function updateStats() {
    const typedText = typingArea.value;
    const wordsTyped = typedText.split(/\s+/).filter(word => word.length > 0).length;
    const charsTyped = typedText.length;
    
    const wpm = (wordsTyped / elapsedTime) * 60;
    const cpm = (charsTyped / elapsedTime) * 60;
    const accuracy = calculateAccuracy(promptText.textContent, typedText);
    
    wpmDisplay.textContent = Math.round(wpm);
    cpmDisplay.textContent = Math.round(cpm);
    accuracyDisplay.textContent = Math.round(accuracy);
  }

  function calculateAccuracy(sampleText, typedText) {
    let correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
      if (sampleText[i] === typedText[i]) {
        correctChars++;
      }
    }
    return (correctChars / Math.max(sampleText.length, typedText.length)) * 100;
  }

  function highlightErrors() {
    const sampleText = promptText.textContent;
    const typedText = typingArea.value;
    let highlightedText = '';

    for (let i = 0; i < sampleText.length; i++) {
      if (i >= typedText.length) {
        highlightedText += `<span class="future">${sampleText[i]}</span>`;
      } else if (sampleText[i] === typedText[i]) {
        highlightedText += `<span class="correct">${sampleText[i]}</span>`;
      } else {
        highlightedText += `<span class="incorrect">${sampleText[i]}</span>`;
      }
    }

    promptText.innerHTML = highlightedText;
  }

  function setNextPrompt() {
    promptText.textContent = prompts[currentPromptIndex];
    highlightErrors();
  }

  function nextPrompt() {
    currentPromptIndex = (currentPromptIndex + 1) % prompts.length;
    setNextPrompt();
    typingArea.value = "";
  }

  resetTypingTest();
});
