window.addEventListener('DOMContentLoaded', function(){
  'use strict';

  function countTimer(deadline){
    const timerHours = document.querySelector('#timer-hours'),
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
    }    

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
    } 
    updateClock();    
  }
  countTimer('10 july 2020');

  const toggleMenu = () => {

    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li');
          

    const hendlerMenu = () => {
      menu.classList.toggle('active-menu');
    };      

    btnMenu.addEventListener('click', hendlerMenu);
    closeBtn.addEventListener('click', hendlerMenu);
    menuItems.forEach((elem) => elem.addEventListener('click', hendlerMenu));
  };
  toggleMenu();


  const togglePopUp = () => {
    const popUp = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close');

      popupBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
          popUp.style.display = 'block';
        });
      });  
      popupClose.addEventListener('click', () => {
        popUp.style.display = 'none';
      })
  };
  togglePopUp();

  let popupContent = document.querySelector('.popup-content'),
      count = 0,
      width = document.documentElement.clientWidth;
  let activeModal = () => {
    count++;
    popupContent.style.left = count  + 'px'; 
    if(count < 535 && width > 768){
      setTimeout(activeModal, 1);
    } 
  };
  activeModal();
});