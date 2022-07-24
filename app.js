const textBox = document.querySelector('#text-box');
const playBtn = document.querySelector('#play');
const pauseBtn = document.querySelector('#pause');
const closeBtn = document.querySelector('#close');
const speakersSelector = document.querySelector('#speakers-selector');
const speakers = document.querySelector('#speakers');

let voices = [];

//Initiate Speech Synthesis
let speech = new SpeechSynthesisUtterance();

//Speak Text in the Text-Box
playBtn.addEventListener('click', () => {

    let text = textBox.value;

    //Set Text
    speech.text = text;

    //Speak Text
    speechSynthesis.speak(speech);

    //Pause Button Appear 
    setTimeout(() => {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    }, 500)
})

//Change Speaker
speakers.addEventListener('change', (e) => {

    console.log(e.target.value);
    speech.voice = e.target.value;

    // speech.voice = voices.find(voice => {
    //     voice.name === e.target.value;

    //     console.log(voice.name === 'Alex');

    // })
 
})

//Pause Button Disappear on Keyboard Press
textBox.addEventListener('keydown', () => {
    setTimeout(() => {
        pauseBtn.style.display = 'none';
        playBtn.style.display = 'inline-block';
    }, 200)
})

//Toggle Speakers Box
speakersSelector.addEventListener('click', () => {
    speakers.classList.toggle('show-speakers');  
 })
 
 //Clear Text-Box
 closeBtn.addEventListener('click', () => {
     textBox.value = '';
 })

//Get Speakers 
function getSpeakers() {
  voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        let option = document.createElement('option');

        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        speakers.appendChild(option);
    })
}

//Set Speech Voice Change
speechSynthesis.addEventListener('voiceschanged', getSpeakers);
getSpeakers();

//Speak The Text 


