'use strict'

let 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Ипотека, кредит'),
    money,
    income = 'Фриланс',    
    deposit = true,
    mission = 300000,
    period = 12;  

console.log(addExpenses.split(','));


let start = function (){
    do{
        money = prompt('Ваш месячный доход?')
    }
    while(isNaN (parseFloat(money)));

   
};

start();

// Вывели тип значений в консоль
let showTypeOf = function(data){
    console.log(data, typeof(data));
};

showTypeOf (money);
showTypeOf (income);
showTypeOf (deposit);


// Депозит (boolean)
deposit  = confirm ('Есть ли у вас депозит в банке?')
console.log(deposit);



let expenses =[];
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };    

console.log(expenses);

const getExpensesMonth = function (){
    let sum = 0;
    let quest;
    for (let i = 0; i < 2; i++ ){
        expenses [i] = prompt ('Введите обязательную статью расходов?');
        do{
            quest = prompt('Во сколько Вам это обойдется?')
        }
        while(!isNumber (quest));
        sum += +quest;
    }   
    
    return sum;
}




let expensesMonth = getExpensesMonth();
console.log('Расходы: ', expensesMonth);




// Вычисляем свободные средства 
let getAccumulatedMonth = function (a, b){
    return a-b;
};

let accumulatedMonth = getAccumulatedMonth (money, expensesMonth)
console.log('Свободные средства: ', accumulatedMonth);




// Вычисляем за сколько месяцев добьемся цели 
let getTargetMonth = function (mission, accumulatedMonth){
   console.log((+(Math.ceil( mission / accumulatedMonth)))); 
        if ((+(Math.ceil( mission / accumulatedMonth))) > 0){ 
        console.log(' Цель будет достигнута');
        }else {
        console.log( ' Цель не будет достигнута');
        }
   return getTargetMonth;
};

getTargetMonth(mission, accumulatedMonth);



// Бюджет на день
let budgetDay = accumulatedMonth/30;
console.log('бюджет на день: ' + (budgetDay.toFixed(2)) );



// Уровень дохода
 let getStatusIncome = function(){
    if (budgetDay >= 1200){
        return ('У вас высокий уровень дохода');
     } else if (budgetDay <= 1200 && budgetDay >= 600){
      return ('У вас средний уровень дохода ');
     } else if (budgetDay < 600 && budgetDay >= 0){
      return (' К сожалению у вас уровень дохода ниже среднего ');
     } else if (budgetDay < 0){
      return (' Что то пошло не так ');
     }    
 }
 console.log(getStatusIncome());