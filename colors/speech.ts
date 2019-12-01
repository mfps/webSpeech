import { colorsByLength, isDark, isValidColor } from "./colors";

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

class Colors {
    colorsElem = document.getElementsByClassName('colors')[0];
    
    constructor(){
        this.colorsElem.innerHTML = this.displayColors(colorsByLength)
    }

    private handleResult = ({results}) => {
        const words:string = results[results.length -1][0].transcript
        let color = words.toLocaleLowerCase().replace(/\s/g, '');
        if(!isValidColor(color)) return;
        const colorSpan = document.getElementsByClassName(color)[0];
        colorSpan.classList.add('got')
        document.body.style.backgroundColor = color;
    }

    private displayColors(colors:string[]) {
        return colors.map(color => `<span class="color ${color} ${isDark(color) ? 'dark' : '' }" style="background:${color}">${color}</span>`).join('')
    }

    private configureSpeech(){
        const recognition = new SpeechRecognition();    
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = this.handleResult;
        recognition.start();
    }

    init(){
        if (!('webkitSpeechRecognition' in window) || !('SpeechRecognition' in window)) return;
        this.configureSpeech();
    }

}

const color = new Colors();
color.init();
