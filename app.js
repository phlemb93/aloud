const textBox = document.getElementById('text-box');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const closeBtn = document.getElementById('close');
const speakersSelector = document.getElementById('speakers-selector');
const speakers = document.getElementById('speakers');


//Initiate Speech Synthesis
const synth = window.speechSynthesis;


//GET SPEAKERS 
let voices = [];

function getSpeakers() {

    voices = synth.getVoices();

      voices.forEach(voice => {
          let option = document.createElement('option');
  
          option.value = voice.name;
          option.innerText = `${voice.name} (${voice.lang})`;
  
          option.setAttribute('data-lang', voice.lang);
          option.setAttribute('data-name', voice.name);

          speakers.appendChild(option);
      })
  }

getSpeakers();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getSpeakers; 
  }
 

//SPEAK TEXT IN THE TEXT-BOX
playBtn.addEventListener('click', () => {

    //Set Speech Text
    const text = textBox.value;
    const speakText = new SpeechSynthesisUtterance(text);

    if(synth.speaking) {
        console.log('A speaker is already speaking');
        return;
    }

    if(textBox.value !== '') {

        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';

        //Speech End
        speakText.onend = (e) => {
            pauseBtn.style.display = 'none';
            playBtn.style.display = 'inline-block';
        }

        //Select Speaker
        let selectedSpeaker = speakers.selectedOptions[0].getAttribute('data-name');
        
        voices.forEach(voice => {
           if(voice.name === selectedSpeaker) {
                speakText.voice = voice;
            }
        });

        //Speak
        synth.speak(speakText);
    
    }

    
})

//CHANGE SPEAKER
speakers.addEventListener('change', (e) => {

      //Set Speech Text
      const text = textBox.value;
      const speakText = new SpeechSynthesisUtterance(text);
  
      if(synth.speaking) {
          console.log('A speaker is already speaking');
          return;
      }
  
      if(textBox.value !== '') {
  
          playBtn.style.display = 'none';
          pauseBtn.style.display = 'inline-block';
  
          //Speech End
          speakText.onend = (e) => {
              pauseBtn.style.display = 'none';
              playBtn.style.display = 'inline-block';
          }
  
          //Select Speaker
          let selectedSpeaker = speakers.selectedOptions[0].getAttribute('data-name');
          
          voices.forEach(voice => {
             if(voice.name === selectedSpeaker) {
                  speakText.voice = voice;
              }
          });
  
          //Speak
          synth.speak(speakText);
      
      }
})

//Toggle Speakers Box
speakersSelector.addEventListener('click', () => {
    speakers.classList.toggle('show-speakers');  
 })

 //Clear Text-Box
 closeBtn.addEventListener('click', () => {
     synth.cancel();
     textBox.value = '';
     pauseBtn.style.display = 'none';
     playBtn.style.display = 'inline-block';
     speakers.classList.remove('show-speakers');  
 })



