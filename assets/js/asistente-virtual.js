console.log('El código se está ejecutando');
const startRecognitionBtn = document.getElementById('startRecognition');

let recognition;
let isRecognitionActive = false;

if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = 'es-ES';

  recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript;
    showTranscriptionOnScreen(transcript);
  };

  recognition.onend = () => {
    isRecognitionActive = false;
  };

  startRecognitionBtn.addEventListener('click', () => {
    if (!isRecognitionActive) {
      isRecognitionActive = true;
      recognition.start();
    }
  });
} else {
  showTranscriptionOnScreen('El reconocimiento de voz no está disponible en este navegador.');
}

function showTranscriptionOnScreen(text) {
  const transcriptionElement = document.createElement('p');
  transcriptionElement.textContent = text;
  document.body.appendChild(transcriptionElement);
}