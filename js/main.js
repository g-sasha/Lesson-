'use strict';

let money,
    start = function (){
        do{
            money = prompt('Ваш месячный доход?');
        }
        while(isNaN (parseFloat(money)));

    
},
    expenses =[];
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }; 

start();

let appData = {
    income:{},
    addIncome: [],
    expenses : {},
    addExpenses: [],
    deposit: false,
    mission: 300000,
    period: 15,
    budget: money, 
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    
    getExpensesMonth: function (){
        let sum = 0;
        let quest;
        for (let i = 0; i < 2; i++ ){
            expenses [i] = prompt ('Введите обязательную статью расходов?');
            do{
                quest = prompt('Во сколько Вам это обойдется?');
            }
            while(!isNumber (quest));
            sum += +quest;
        }   
        
        return sum;
    },

    getAccumulatedMonth: function (money, expensesMonth){
        return money-expensesMonth;
    },

    getTargetMonth: function (mission, accumulatedMonth){
        console.log((+(Math.ceil( mission / accumulatedMonth)))); 
             if ((+(Math.ceil( mission / accumulatedMonth))) > 0){ 
             console.log(' Цель будет достигнута');
             }else {
             console.log( ' Цель не будет достигнута');
             }
        return (+(Math.ceil( mission / accumulatedMonth)));
     },

     getStatusIncome: function(){
        if (budgetDay >= 1200){
            return ('У вас высокий уровень дохода');
         } else if (budgetDay <= 1200 && budgetDay >= 600){
          return ('У вас средний уровень дохода ');
         } else if (budgetDay < 600 && budgetDay >= 0){
          return (' К сожалению у вас уровень дохода ниже среднего ');
         } else if (budgetDay < 0){
          return (' Что то пошло не так ');
         }    
     },
};

let 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Ипотека, кредит'),
    income = 'Фриланс',    
    deposit = true,
    mission = 300000,
    period = 12;  

console.log(addExpenses.split(','));


// Депозит (boolean)
deposit  = confirm ('Есть ли у вас депозит в банке?');
console.log(deposit);


let expensesMonth = appData.getExpensesMonth();
console.log('Расходы: ', expensesMonth);


let accumulatedMonth = appData.getAccumulatedMonth (money, expensesMonth);
console.log('Свободные средства: ', accumulatedMonth);


let targetMonth = appData.getTargetMonth(mission, accumulatedMonth);


// Бюджет на день
let budgetDay = accumulatedMonth/30;
console.log('бюджет на день: ' + (budgetDay.toFixed(2)) );



let statusIncome = appData.getStatusIncome();
console.log('statusIncome: ', statusIncome);
