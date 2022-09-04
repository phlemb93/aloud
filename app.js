const textBox = document.getElementById('text-box');
const playBtn = document.getElementById('play');
const resumeBtn = document.getElementById('resume');
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
    const utter = new SpeechSynthesisUtterance(text);
     

    if(text !== '') {

          playBtn.style.display = 'none';
          resumeBtn.style.display = 'none';
          pauseBtn.style.display = 'inline-block';
  

        //Speech End
        utter.onend = (e) => {
            pauseBtn.style.display = 'none';
            resumeBtn.style.display = 'none';
            playBtn.style.display = 'inline-block';
        }

        //Select Speaker
        let selectedSpeaker = speakers.selectedOptions[6].getAttribute('data-name');
        
        voices.forEach(voice => {
           if(voice.name === selectedSpeaker) {
                utter.voice = voice;
            }
        });

        //Speak
        synth.cancel();
        synth.speak(utter);  
    }
})

//CHANGE SPEAKER
speakers.addEventListener('change', (e) => {

      //Set Speech Text
      const text = textBox.value;
      const utter = new SpeechSynthesisUtterance(text);

      if(textBox.value !== '') {
  
          playBtn.style.display = 'none';
          resumeBtn.style.display = 'none';
          pauseBtn.style.display = 'inline-block';
  
          //Speech End
          utter.onend = (e) => {
            pauseBtn.style.display = 'none';
            resumeBtn.style.display = 'none';
            playBtn.style.display = 'inline-block';
          }
  
          //Select Speaker
          let selectedSpeaker = speakers.selectedOptions[6].getAttribute('data-name');
          
          voices.forEach(voice => {
             if(voice.name === selectedSpeaker) {
                  utter.voice = voice;
              }
          });
  
          //Speak
          synth.cancel();
          synth.speak(utter);
      
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
     speakers.classList.remove('show-speakers'); 
     
     //Too remove the pause button on mobile browsers
     pauseBtn.style.display = 'none';
     resumeBtn.style.display = 'none';
     playBtn.style.display = 'inline-block';
 })

 //Pause The Speech
pauseBtn.addEventListener('click', () => {
    synth.pause()

    pauseBtn.style.display = 'none';
    playBtn.style.display = 'none';
    resumeBtn.style.display = 'inline-block';
})

 //Resume The Speech
resumeBtn.addEventListener('click', () => {
    synth.resume()

    resumeBtn.style.display = 'none';
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
})

//Stop Play When The Page Reloads
window.onload = synth.cancel();