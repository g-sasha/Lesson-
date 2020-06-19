'use strict';
// Удалили рекламу
const adv =document.querySelector('.adv');
adv.remove();

const book = document.querySelectorAll('.book');
console.log('book: ', book);

// Расставили книги по номерам 
book[0].insertAdjacentElement('beforebegin', book[1]);
book[5].insertAdjacentElement('afterend', book[2]);
book[5].insertAdjacentElement('beforebegin', book[3]);

// Меняем название у книги 
const bookTitle = document.getElementsByTagName('a');
bookTitle[2].textContent = 'Книга 3. this и Прототипы Объектов';

// Изменили Фоновую картинку
const body = document.getElementsByTagName('body')[0];
body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// Добавили Главу 8
const getChapters = document.createElement('li');
getChapters.textContent = 'Глава 8: За пределами ES6';
book[2].append(getChapters);

const chapters = document.getElementsByTagName('li');
console.log('chapters: ', chapters);
chapters[57].insertAdjacentElement('afterend', chapters[56]);

// Книга 2
const bookTwo  = book[0];
const item = bookTwo.querySelectorAll('li');


item[2].before(item[3]);
item[3].after(item[6]);
item[6].after(item[8]);
item[8].after(item[4]);

// Книга 5
const bookFive  = book[5];
const part = bookFive.querySelectorAll('li');
console.log('part: ', part);

part[1].after(part[9]);
part[9].after(part[3]);
part[3].after(part[4]);
part[7].after(part[5]);

