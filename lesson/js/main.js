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
    periodAmount = document.querySelector('.period-amount'), 
    cencel = document.getElementById('cancel');



const AppData = function(){
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

};
    
AppData.prototype.start = function (){
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
    });
    
};

AppData.prototype.reset = function(){
    let items = document.querySelectorAll('input[type=text]');
    let inp = document.querySelector ('input[type=range]');
    start.style.display = 'block';
    cencel.style.display = 'none'; 
    btnIncome.style.display = 'block';
    btnExpenses.style.display = 'block';
    
    depositCheck.checked = false;    
    inp.value = 1;
    periodAmount.innerHTML = inp.value;   
    periodAmount = 1;
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
    }

    for( let i = 0; i < expensesItem.length; i++ ){
        if(i > 0){
            expensesItem[i].parentNode.removeChild(expensesItem[i]);
        }
    }

};

AppData.prototype.showResult = function(){
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue. value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney(); 
    periodSelect.addEventListener('input', () => {
        incomePeriodValue.value = _this.calcSavedMoney();
    });           
};
AppData.prototype.addExpensesBlock = function (){
    
    let cloneExpensesItem = expensesItem[0].cloneNode(true);
    expensesItem[0].parentNode.insertBefore (cloneExpensesItem, btnExpenses);
    expensesItem = document.querySelectorAll ('.expenses-items');

    if (expensesItem.length === 3){
        btnExpenses.style.display = 'none';
    }
};
AppData.prototype.addIncomeBlock = function (){
    let cloneIncomeItem = incomeItem[0].cloneNode(true);
    incomeItem[0].parentNode.insertBefore (cloneIncomeItem, btnIncome);
    incomeItem = document.querySelectorAll ('.income-items');

    if (incomeItem.length === 3){
        btnIncome.style.display = 'none';
    }

};
AppData.prototype.getExpenses = function (){
    const _this = this;
    expensesItem.forEach(function (item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== ''){
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};   

AppData.prototype.getIncome = function(){
    const _this = this;
    incomeItem.forEach(function (item){
        let itemIncome = item.querySelector('.income-title').value;              
        let cashIncome = item.querySelector('.income-amount').value;  
        if (itemIncome !== '' && cashIncome !== ''){
            _this.income[itemIncome] = cashIncome;
        }
        for (let key in _this.income ){
            _this.incomeMonth+= +_this.income[key];
        }
    });
};

AppData.prototype.getAddExpenses = function (){
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if(item !== ''){
            _this.addExpenses.push(item);
        }
    });
}; 

AppData.prototype.getAddIncome = function(){
    const _this = this;
    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if(itemValue !== ''){
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getBudget = function (){
    this.budgetMonth = this.budget + this.incomeMonth - +this.expensesMonth;
    this.budgetDay =  +this.budgetMonth / 30; // округлить 
    
};

AppData.prototype.getTargetMonth = function (){
    return ( targetAmount.value / this.budgetMonth);    
    
 };

 AppData.prototype.getStatusIncome = function(){
    const _this = this;
    if (_this.budgetDay >= 1200){
        return ('У вас высокий уровень дохода');
     } else if (_this.budgetDay <= 1200 && _this.budgetDay >= 600){
      return ('У вас средний уровень дохода ');
     } else if (_this.budgetDay < 600 && _this.budgetDay >= 0){
      return (' К сожалению у вас уровень дохода ниже среднего ');
     } else if (_this.budgetDay < 0){
      return (' Что то пошло не так ');
     }    
 };
 
 AppData.prototype.getExpensesMonth = function (){
    const _this = this;
    for (const key in _this.expenses) {
        _this.expensesMonth += +_this.expenses[key];
    }
};

AppData.prototype.getInfoDepodit = function (){
    const _this = this;
    _this.deposit  = confirm ('Есть ли у вас депозит в банке?');
    if(_this.deposit){
        do {
            _this.percenDeposit = prompt (' Какой у Вас годовой процент?', 10);
        }
        while (!isNumber(_this.percenDeposit));
        
        do {
            _this.moneyDeposit = prompt (' Какая сумма у вас заложена', 10000);
        }
        while (!isNumber(_this.moneyDeposit));
    }
},
AppData.prototype.calcSavedMoney = function(){
    return this.budgetMonth * periodSelect.value;
    
};

AppData.prototype.range = function(){ 
    let inp = document.querySelector ('input[type=range]');
    periodAmount.innerHTML = inp.value;         
};





AppData.prototype.eventsListeners = function (){
    start.disabled = true;
    salaryAmount.addEventListener('input', () => {
        start.disabled = salaryAmount.value === '';
    });


    start.addEventListener('click', this.start.bind(this));
    cencel.addEventListener('click', this.reset.bind(this));

    btnExpenses.addEventListener('click', this.addExpensesBlock);

    btnIncome.addEventListener ('click', this.addIncomeBlock);

    periodSelect.addEventListener('input', this.range);

    let statusIncome = this.getStatusIncome(); //  уровень дохода 

    this.getInfoDepodit();

};


const appData = new AppData();
console.log('appData: ', appData);
appData.eventsListeners();






















// cencel.addEventListener('click', appData.reset.bind(appData));

// start.disabled = true;
// salaryAmount.addEventListener('input', () => {
//     start.disabled = salaryAmount.value === '';
// });

// start.addEventListener('click', appData.start.bind(appData));

// btnExpenses.addEventListener('click', appData.addExpensesBlock);

// btnIncome.addEventListener ('click', appData.addIncomeBlock);

// periodSelect.addEventListener('input', appData.range);

// let statusIncome = appData.getStatusIncome(); //  уровень дохода 

// appData.getInfoDepodit();

 