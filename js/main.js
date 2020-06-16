'use strict';

let money,
    start = function (){
        do{
            money = prompt('Ваш месячный доход?');
        }
        while(isNaN (parseFloat(money)));

    
},

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
    
    

    getBudget: function (){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay =  appData.budgetMonth / 30; // округлить 
        
    },

    getTargetMonth: function (){
        let result = Math.ceil( appData.mission / appData.budgetMonth)
        if (result > 0) {
            return' Цель будет достигнута';
        } else {
            return' Цель не будет достигнута';
        }        
        
     },

     getStatusIncome: function(){
        if (appData.budgetDay >= 1200){
            return ('У вас высокий уровень дохода');
         } else if (appData.budgetDay <= 1200 && appData.budgetDay >= 600){
          return ('У вас средний уровень дохода ');
         } else if (appData.budgetDay < 600 && appData.budgetDay >= 0){
          return (' К сожалению у вас уровень дохода ниже среднего ');
         } else if (appData.budgetDay < 0){
          return (' Что то пошло не так ');
         }    
     },
     
     getExpensesMonth: function (){
        for (const key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
            console.log(appData.expenses[key]);
        }
    },
    
     asking: function(){
        let 
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Ипотека, кредит');
            appData.addExpenses = addExpenses.toLocaleLowerCase().split(',');
            appData.deposit  = confirm ('Есть ли у вас депозит в банке?');

        let expenses =[];               
        for (let i = 0; i < 2; i++ ){
            let  expensesName = prompt ('Введите обязательную статью расходов?');
            let massage;
            do{
                massage = prompt('Во сколько Вам это обойдется?');
            }
            while(!isNumber (massage));
            appData.expenses [expensesName] =+massage;            
        } 
        
    }
};


appData.asking();


appData.getExpensesMonth(); // сложение всех затрат 
console.log('Расходы: ', appData.expensesMonth);


appData.getBudget();
console.log(appData.budgetMonth); // бюджет на месяц 
console.log(appData.budgetDay); // бюджет на день



console.log(appData.getTargetMonth()); // достижение цели 



let statusIncome = appData.getStatusIncome(); //  уровень дохода 
console.log('statusIncome: ', statusIncome);
