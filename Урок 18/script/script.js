window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  function countTimer(deadline) {
    const timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timerRemainig = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timerRemainig % 60),
        minutes = Math.floor((timerRemainig / 60) % 60),
        hours = Math.floor((timerRemainig / 60 / 60) % 24);
      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      return {
        timerRemainig,
        hours,
        minutes,
        seconds
      };
    }

    function updateClock() {
      let timer = getTimeRemaining();
      timerHours.textContent = timer.hours,
        timerMinutes.textContent = timer.minutes,
        timerSeconds.textContent = timer.seconds;

      if (timer.timerRemainig > 0) {
        setInterval(updateClock, 1000);
      } else {
        timerHours.textContent = '00', timerHours.style.color = 'red';
        timerMinutes.textContent = '00', timerMinutes.style.color = 'red';
        timerSeconds.textContent = '00', timerSeconds.style.color = 'red';
      }
    }
    updateClock();
  }
  countTimer('13 july 2020');

  
  const toggleMenu = (e) => {
    const menu = document.querySelector('menu'),
          mainHeader = document.querySelector('.main-header');

    // Кнопка Меню
    mainHeader.addEventListener('click', (e) => {
      if(e.target.classList.contains('active-menu')){
        return;
      } 
      menu.classList.toggle('active-menu');
    });

    // крестик и пункты меню
    menu.addEventListener('click', (e) => {
      if(e.target.classList.contains('active-menu')){
        return;
      } 
      menu.classList.toggle('active-menu');
    });
    
  };
  toggleMenu();


  const togglePopUp = () => {
    const popUp = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn');

    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        if(document.documentElement.clientWidth > 768){
          activeModal();
        } else {
          popUp.style.display = 'block';
        }
      });      
    });

    popUp.addEventListener('click', (event) => {
      let target = event.target;
      if (target.classList.contains('popup-close')) {
        popUp.style.display = 'none';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popUp.style.display = 'none';
        }
      }
    });
    
      let popupContent = document.querySelector('.popup-content');
      let activeModal = () => {
      popUp.style.display = 'block';
      popupContent.style.opacity = 0;
      let  count = 0;
      const  animateMenu = setInterval(()=>{
        if(count < 1){
          popupContent.style.opacity = count +=0.1;
        } else {
          clearInterval(animateMenu);
        }
      },50); 
    };
  };
  togglePopUp();


  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'), // шапка с названиями 
          tab = tabHeader.querySelectorAll('.service-header-tab'), // названия
          tabContent = document.querySelectorAll('.service-tab'); // описания 

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tabContent[i].classList.add('d-none');
          tab[i].classList.remove('active');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }

    });
  };
  tabs();


  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'), //карточки слайдов 
    btn = document.querySelectorAll('.portfolio-btn'), // кнопка
    dot = document.querySelectorAll('.dot'), // точки
    slider = document.querySelector('.portfolio-content'); // родитель

    let currenSlide = 0,
    interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {

      prevSlide(slide, currenSlide, 'portfolio-item-active');
      prevSlide(dot, currenSlide, 'dot-active');
      currenSlide++;
      if(currenSlide >= slide.length){
        currenSlide = 0;
      }
      nextSlide(slide, currenSlide, 'portfolio-item-active');
      nextSlide(dot, currenSlide, 'dot-active');
    };

    const startSlide = (time = 1000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if(!target.matches('.portfolio-btn, .dot')){
        return;
      }

      prevSlide(slide, currenSlide, 'portfolio-item-active');
      prevSlide(dot, currenSlide, 'dot-active');

      if(target.matches('#arrow-right')){
        currenSlide++;
      } else if (target.matches('#arrow-left')){
        currenSlide--;
      } else if(target.matches('.dot')){
        dot.forEach((elem, index) => {
          if(elem === target){
            currenSlide = index;
          }
        });
      }
      if(currenSlide >= slide.length){
        currenSlide = 0;
      }

      if(currenSlide < 0){
        currenSlide = slide.length -1;
      }
      nextSlide(slide, currenSlide, 'portfolio-item-active');
      nextSlide(dot, currenSlide, 'dot-active');      
    });


    slider.addEventListener('mouseover', (event) => {
      if(event.target.matches('.portfolio-btn')
       || event.target.matches('.dot')){
        stopSlide();
      }
    });
    
    slider.addEventListener('mouseout', (event) => {
      if(event.target.matches('.portfolio-btn') 
      || event.target.matches('.dot')){
        startSlide();
      }
    })
    startSlide();
  };
  slider();

});