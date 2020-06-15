
 const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min) + min)

 const isNumber = n =>  !isNaN(parseFloat(n)) && isFinite(n);
 
 const startGame = () => {
     
 
     const randomNum = getRandomNum (1, 100);
     
     return function processGame(){        
         const userNum = prompt(' Укажите ваше число от 1 до 100');
         let num;
         console.log(`Рандомное число заданное ботом: ${randomNum}`);
 
         if(isNumber(userNum)){
             num =+userNum;
             if (num > randomNum){
                 alert(' Загадонное число меньше');
                 return processGame();
             } else if (num < randomNum){
                 alert(' Загадонное число больше');
                 return processGame();
             } else {
                 alert(' Вы угадали');
                 if (confirm(' Хотите еще?')){
                     return startGame()();
                 } else {
                     alert (' Спасибо за игру!')
                 }
             }
             
         } else if (userNum === null){
             alert (' Вы завершили игру!')
         } else {
             alert(' Введите число')
             return processGame();
         }
     }
 }
 
 startGame ()();
 










