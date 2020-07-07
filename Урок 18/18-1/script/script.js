window.addEventListener('DOMContentLoaded', function(){
  'use strict';
  

  function countTimer(deadline){
    let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining (){
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timerRemainig = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timerRemainig % 60),
        minutes = Math.floor((timerRemainig / 60) % 60),
        hours = Math.floor((timerRemainig / 60 / 60) % 24);
      if (hours < 10){
        hours = '0' + hours;
      }       
      if (minutes < 10){
        minutes = '0' + minutes;
      } 
      if (seconds < 10){
        seconds = '0' + seconds;
      } 
      return{timerRemainig, hours, minutes, seconds};      
    };   
    

    function updateClock (){
      let timer = getTimeRemaining();
      timerHours.textContent = timer.hours,
      timerMinutes.textContent = timer.minutes,
      timerSeconds.textContent = timer.seconds;
      
      if (timer.timerRemainig > 0){
        setInterval(updateClock, 1000);
      }else {
        timerHours.textContent = '00', timerHours.style.color = 'red';
        timerMinutes.textContent = '00',timerMinutes.style.color = 'red';
        timerSeconds.textContent = '00',timerSeconds.style.color = 'red';
      }     
    };   
    updateClock();    
  }  
  countTimer('07 july 2020');
})