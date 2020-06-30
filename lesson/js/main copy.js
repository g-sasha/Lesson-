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
    incomeItem = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount'); 

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
        let items = document.querySelectorAll('input[type=text]');
        this.budget = +salaryAmount.value;

        this.getExpenses();   
        this.getIncome();
        this.getExpensesMonth();           
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.range();
        
        
        this.showResult();

        start.style.display = 'none';
        cencel.style.display = 'block';

        items.forEach(function(item){
            item.disabled = true;

            // через цикл for 
        });
        
    },
    reset: function(){
        let items = document.querySelectorAll('input[type=text]');

        start.style.display = 'block';
        cencel.style.display = 'none'; 
        btnIncome.style.display = 'block';
        btnExpenses.style.display = 'block';

        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses  = {};
        this.addExpenses = [];
        this.deposit = false;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.percenDeposit = 0;
        this.moneyDeposit = 0;

        items.forEach(function(item){
            item.disabled = false;
            item.value = '' ;          
        });
        incomeItem = document.querySelectorAll('.income-items');
        
        expensesItem = document.querySelectorAll ('.expenses-items');
        
        for( let i = 0; i < incomeItem.length; i++ ){
            if(i > 0){
                incomeItem[i].parentNode.removeChild(incomeItem[i]);
            }
        };

        for( let i = 0; i < expensesItem.length; i++ ){
            if(i > 0){
                expensesItem[i].parentNode.removeChild(expensesItem[i]);
            }
        };
    },

    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.floor(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue. value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcSavedMoney(); 
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = appData.calcSavedMoney();
        });           
    },
    addExpensesBlock: function (){
        
        let cloneExpensesItem = expensesItem[0].cloneNode(true);
        expensesItem[0].parentNode.insertBefore (cloneExpensesItem, btnExpenses);
        expensesItem = document.querySelectorAll ('.expenses-items');

        if (expensesItem.length === 3){
            btnExpenses.style.display = 'none';
        }
    },
    addIncomeBlock: function (){
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore (cloneIncomeItem, btnIncome);
        incomeItem = document.querySelectorAll ('.income-items');

        if (incomeItem.length === 3){
            btnIncome.style.display = 'none';
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

    getIncome: function(){
        incomeItem.forEach(function (item){
            let itemIncome = item.querySelector('.income-title').value;              
            let cashIncome = item.querySelector('.income-amount').value;  
            if (itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
            for (let key in appData.income ){
                appData.incomeMonth+= +appData.income[key];
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
        return ( targetAmount.value / appData.budgetMonth);    
        
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

    getInfoDepodit: function (){
        appData.deposit  = confirm ('Есть ли у вас депозит в банке?');
        if(appData.deposit){
            do {
                appData.percenDeposit = prompt (' Какой у Вас годовой процент?', 10);
            }
            while (!isNumber(appData.percenDeposit));
            
            do {
                appData.moneyDeposit = prompt (' Какая сумма у вас заложена', 10000);
            }
            while (!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * periodSelect.value;
        
    },
    
    range: function(){ 
        let inp = document.querySelector ('input[type=range]');
        periodAmount.innerHTML = inp.value;         
    },
    
};





let cencel = document.getElementById('cancel')


cencel.addEventListener('click', appData.reset.bind(appData));

start.disabled = true;
salaryAmount.addEventListener('input', () => {
    start.disabled = salaryAmount.value === '';
});

start.addEventListener('click', appData.start.bind(appData));

btnExpenses.addEventListener('click', appData.addExpensesBlock);

btnIncome.addEventListener ('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.range);

let statusIncome = appData.getStatusIncome(); //  уровень дохода 

appData.getInfoDepodit();

 