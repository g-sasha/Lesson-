'use strict';

let money,
    start = function (){
        do{
            money = prompt('Ваш месячный доход?');
        }
        while(isNaN (parseFloat(money)));

    
};

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }; 

const isText = function(str){
    const pattern = new RegExp('[^а-яё\S]', 'gi');
    return Boolean(str.match(pattern));
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
    percenDeposit: 0,
    moneyDeposit: 0,
    

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

        if (confirm(' Есть ли у вас дополнительный зароботок?')){
            let itemIncome;
            do {
                itemIncome = prompt(' Перечислите ваш дополнительный доход', 'Фриланс');
            }
            while (isText (itemIncome));
            let cashIncome;
            do {
            cashIncome = prompt(' Сколько вы на этом зарабатываете', 10000);
            }
            while(!isNumber (cashIncome));    
            appData.income[itemIncome] = cashIncome;

            
        }
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'ипотека, кредит');
        addExpenses = addExpenses.split(', ');
            let arr = [];
            for (let i = 0; i < addExpenses.length; i++ ){
                arr.push(addExpenses[i].split('')[0].toUpperCase() + addExpenses[i].slice(1).toLowerCase());                
            }
        console.log('arr: ', arr);
           

          
            
            appData.deposit  = confirm ('Есть ли у вас депозит в банке?');
            
            
                      
        for (let i = 0; i < 2; i++ ){
            let  expensesName;
            do {
                expensesName = prompt ('Введите обязательную статью расходов?');
            } 
            while(isText (expensesName));
            let massage;
            do{
                massage = prompt('Во сколько Вам это обойдется?');
            }
            while(!isNumber (massage));
            appData.expenses [expensesName] =+massage;            
        }

        
        
    },
    getInfoDepodit: function (){
        if(appData.deposit){
            do {
                appData.percenDeposit = prompt (' Какой у Вас годовой процент?', 10);
            }
            while (!isNumber(appData.percenDeposit))
            
            do {
                appData.moneyDeposit = prompt (' Какая сумма у вас заложена', 10000)
            }
            while (!isNumber(appData.moneyDeposit))
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};


appData.asking();
appData.getExpensesMonth(); // сложение всех затрат 
console.log('Расходы: ', appData.expensesMonth);


appData.getBudget();
console.log(appData.budgetMonth); // бюджет на месяц 
console.log(Math.floor(appData.budgetDay)); // бюджет на день



console.log(appData.getTargetMonth()); // достижение цели 



let statusIncome = appData.getStatusIncome(); //  уровень дохода 
console.log('Уровень дохода: ', statusIncome);

appData.getInfoDepodit();
console.log(appData.percenDeposit,  appData.moneyDeposit, appData.calcSavedMoney());