class SpeechSynthesizer {
  voicesDropdown = document.querySelector("#voices");
  options = document.querySelectorAll('[type="range"], [name="text"]');
  speakButton = document.querySelector("#speak");
  stopButton = document.querySelector("#stop");
  voices = [];
  msg = new SpeechSynthesisUtterance();

  constructor() {
    this.init();
  }

  init() {
    this.msg.text = document.querySelector('[name="text"]').value;
    this.eventHandler();
  }

  eventHandler() {
    speechSynthesis.addEventListener("voiceschanged", e => this.populateVoices(e));

    this.voicesDropdown.addEventListener("change", e => this.setVoice(e));

    this.options.forEach(option => option.addEventListener("change", e => this.setOption(e)));

    this.speakButton.addEventListener("click", () => this.toggle());

    this.stopButton.addEventListener("click", () => this.toggle(false));
  }

  populateVoices(e) {
    this.voices = e.target.getVoices();

    this.voicesDropdown.innerHTML = this.voices
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join("");
  }

  setVoice(e) {
    this.msg.voice = this.voices.find(voice => voice.name === e.target.value);
    this.toggle();
  }

  toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
      speechSynthesis.speak(this.msg);
    }
  }

  setOption(e) {
    this.msg[e.target.name] = e.target.value;
    this.toggle();
  }
}

(() => {
  new SpeechSynthesizer();
})();
