'use strick';

let greeting=(new Date()).getHours(); 
if (greeting > 6 && greeting < 10)
{document.write('Доброе утро!');}
if (greeting > 10 && greeting < 16) 
{document.write('Добрый день!');}
if (greeting > 16 && greeting < 24) 
{document.write('Добрый вечер!');}
if (greeting > 23 || greeting < 6) 
{document.write('Доброй ночи!');}

function getWeekDay(date) {
  let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return days[date.getDay()];
};

let date = new Date(); 
document.write(' Сегодня: ' +  getWeekDay(date) + '.');
document.write(' Текущее время: ' + date.toTimeString().substring(0,9)+ '.');

let countDay = function(deadline){
  let newYear = new Date(deadline).getTime();
  let today = new Date().getTime();

  dayRemaining = Math.floor((newYear - today) / 1000 / 60 / 60 / 24); 
  function sklonenie(number, txt) {
    var cases = [2, 0, 1, 1, 1, 2];
    return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}
document.write(`До нового года осталось ${dayRemaining} ${sklonenie(dayRemaining, ['день', 'дня', 'дней'])}`) 
}

countDay('31 december 2020');




