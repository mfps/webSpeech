class SpeechRecognition {
  constructor() {
    this.words = document.querySelector('.words');
    this.languages = document.querySelector('.languages');
    this.init();
  }

  init() {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition)();

    recognition.interimResults = true;

    this.render();
    this.eventHandler(recognition);
    this.getLanguage(recognition);
    recognition.start();
  }

  getLanguage(recognition) {
    let languages = navigator.languages;
    languages = languages.filter(lang => lang.includes('-'));

    const options = languages.map(
      (element, index) =>
        this.languages.options[this.languages.options.length] = new Option(
          element,
          element
        )
    );
  }

  eventHandler(recognition) {
    this.languages.addEventListener('change', e => {
      recognition.lang = e.target.value;
    });

    recognition.addEventListener('result', e => {
      const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      this.addText(transcript, e.results[0].isFinal);
    });

    recognition.addEventListener('end', recognition.start);

    recognition.addEventListener('error', e => {
      console.log(e);
    });
  }

  addText(text, isFinal) {
    const p = this.words.lastElementChild;
    const poopScript = text.replace(/poop|poo|shit|dump/gi, '💩');
    p.textContent = poopScript;

    if (isFinal) {
      this.render();
    }
  }

  render() {
    const p = document.createElement('p');
    this.words.appendChild(p);
  }
}

(() => {
  new SpeechRecognition();
})();
