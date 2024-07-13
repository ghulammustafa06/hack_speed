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
