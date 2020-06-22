'use strict';

   

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }; 

const isText = function(str){
    const pattern = new RegExp('[^а-яё\S]', 'gi');
    return Boolean(str.match(pattern));
};

let start = document.getElementById('start'),
    btnIncome = document.getElementsByTagName ('button')[0],
    btnExpenses = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncome = document.querySelectorAll('.additional_income-item')[0],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    incomeTitle = document.querySelectorAll('.income-title')[1],
    expensesTitle = document.querySelectorAll('.expenses-title')[1],
    expensesItem = document.querySelectorAll ('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeItem = document.querySelectorAll('.income-items');
    

let appData = {
    income:{},
    incomeMonth: 0,
    addIncome: [],
    expenses : {},
    addExpenses: [],
    deposit: false,
    budget: 0, 
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    percenDeposit: 0,
    moneyDeposit: 0,

    start: function (){
        if (salaryAmount.value === ''){
            alert ('Ошибка! Поле "Месячный доход должно быть заполнено!"');
            return;
        }

        appData.budget = +salaryAmount.value;

        appData.getExpenses();   
        appData.getIncome();
        appData.getExpensesMonth(); 
          
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        
        appData.showResult();

    },

    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue. value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcSavedMoney();
    },
    addExpensesBlock: function (){
        
        let cloneExpensesItem = expensesItem[0].cloneNode(true);
        expensesItem[0].parentNode.insertBefore (cloneExpensesItem, btnExpenses);
        expensesItem = document.querySelectorAll ('.expenses-items');

        if (expensesItem.length === 3){
            btnExpenses.style.display = 'none';
        }
    },
    getExpenses: function (){
        expensesItem.forEach(function (item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },   
    getAddExpenses: function (){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getIncome: function(){
        if (confirm(' Есть ли у вас дополнительный зароботок?')){
            let itemIncome = prompt(' Перечислите ваш дополнительный доход', 'Фриланс');                    
            let cashIncome = prompt(' Сколько вы на этом зарабатываете', 10000);                    
            appData.income[itemIncome] = cashIncome;
        }

        for (let key in appData.income ){
            appData.incomeMonth+= +appData.income[key]
        }
    },
        
    
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    getBudget: function (){
        appData.budgetMonth = appData.budget + appData.incomeMonth - +appData.expensesMonth;
        appData.budgetDay =  +appData.budgetMonth / 30; // округлить 
        
    },

    getTargetMonth: function (){
        return ( targetAmount.value / appData.budgetMonth)        
        
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
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    
    //  asking: function(){

    //     if (confirm(' Есть ли у вас дополнительный зароботок?')){
    //         let itemIncome;
    //         do {
    //             itemIncome = prompt(' Перечислите ваш дополнительный доход', 'Фриланс');
    //         }
    //         while (isText (itemIncome));
    //         let cashIncome;
    //         do {
    //         cashIncome = prompt(' Сколько вы на этом зарабатываете', 10000);
    //         }
    //         while(!isNumber (cashIncome));    
    //         appData.income[itemIncome] = cashIncome;

            
    //     }
    //     let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'ипотека, кредит');
    //     addExpenses = addExpenses.split(', ');
    //         let arr = [];
    //         for (let i = 0; i < addExpenses.length; i++ ){
    //             arr.push(addExpenses[i].split('')[0].toUpperCase() + addExpenses[i].slice(1).toLowerCase());                
    //         }
    //     console.log('arr: ', arr); 
    // },


    getInfoDepodit: function (){
        appData.deposit  = confirm ('Есть ли у вас депозит в банке?');
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
        return appData.budgetMonth * periodSelect.value;
    }
};

start.addEventListener('click', appData.start);

btnExpenses.addEventListener('click', appData.addExpensesBlock);

let statusIncome = appData.getStatusIncome(); //  уровень дохода 

appData.getInfoDepodit();

 