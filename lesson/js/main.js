'use strict';

   

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }; 

const isText = function(str){
    const pattern = new RegExp('[^а-яё\S]', 'gi');
    return Boolean(str.match(pattern));
};

const start = document.getElementById('start'),
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
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    salaryAmount = document.querySelector('.salary-amount'),
    periodAmount = document.querySelector('.period-amount'), 
    cencel = document.getElementById('cancel');
    
let expensesItem = document.querySelectorAll ('.expenses-items'),
    incomeItem = document.querySelectorAll('.income-items');
class AppData {
    constructor() {
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
    }
    start(){
        const items = document.querySelectorAll('input[type=text]');
        this.budget = +salaryAmount.value;
    
        this.getExpenses();   
        this.getIncome();
        this.getExpensesMonth();           
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.range();    
        
        this.showResult();
    
        // меняем кнупку старт на сбросить
        start.style.display = 'none';
        cencel.style.display = 'block';
        // блокируем поля 
        items.forEach(function(item){
            item.disabled = true;
    
    
        });    
    }

    reset(){
        const items = document.querySelectorAll('input[type=text]');
        const inp = document.querySelector ('input[type=range]');
        // меняем кнопку сбросить на старт
        start.style.display = 'block';
        cencel.style.display = 'none'; 
    
        btnIncome.style.display = 'block';
        btnExpenses.style.display = 'block';

        depositCheck.checked = false;    
        inp.value = 1;
        periodAmount.innerHTML = inp.value;   
        
    
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
    
        // разблокировываем поля
        items.forEach(function(item){
            item.disabled = false;
            item.value = '' ;          
        });
        // удаляем после ресета новые доходы
        for( let i = 0; i < incomeItem.length; i++ ){
            if(i > 0){
                incomeItem[i].parentNode.removeChild(incomeItem[i]);
            }
        }
        // удаляем после ресета новые расходы
        for( let i = 0; i < expensesItem.length; i++ ){
            if(i > 0){
                expensesItem[i].parentNode.removeChild(expensesItem[i]);
            }
        }
    }
    showResult(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue. value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSavedMoney(); 
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcSavedMoney();
        });           
    }
    addExpensesBlock(){
    
        const cloneExpensesItem = expensesItem[0].cloneNode(true);
        expensesItem[0].parentNode.insertBefore (cloneExpensesItem, btnExpenses);
        expensesItem = document.querySelectorAll ('.expenses-items');
    
        if (expensesItem.length === 3){
            btnExpenses.style.display = 'none';
        }
    }
    addIncomeBlock(){
        const cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore (cloneIncomeItem, btnIncome);
        incomeItem = document.querySelectorAll ('.income-items');
    
        if (incomeItem.length === 3){
            btnIncome.style.display = 'none';
        }
    
    }
    
    // получаем расходы 
    getExpenses(){
        // const _this = this;
        expensesItem.forEach(item =>{
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== ''){
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    } 
    
    // получаем доходы 
    getIncome(){
        incomeItem.forEach(item =>{
            const itemIncome = item.querySelector('.income-title').value;              
            const cashIncome = item.querySelector('.income-amount').value;  
            if (itemIncome !== '' && cashIncome !== ''){
                this.income[itemIncome] = cashIncome;
            }
            for (let key in this.income ){
                this.incomeMonth+= +this.income[key];
            }
        });
    }
    
    // возможные расходы 
    getAddExpenses(){
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item =>{
            item = item.trim();
            if(item !== ''){
                this.addExpenses.push(item);
            }
        });
    }
    
    
    getAddIncome(){
        additionalIncomeItem.forEach(item=>{
            const itemValue = item.value.trim();
            if(itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        });
    }
    
    // бюджет на день 
    getBudget(){
        this.budgetMonth = this.budget + this.incomeMonth - +this.expensesMonth;
        this.budgetDay =  +this.budgetMonth / 30; 
        
    }
    // цель в месяцах 
    getTargetMonth(){
        return ( targetAmount.value / this.budgetMonth);    
        
     }
     // уровень дохода 
     getStatusIncome () {
        if (this.budgetDay >= 1200){
            return ('У вас высокий уровень дохода');
         } else if (this.budgetDay <= 1200 && this.budgetDay >= 600){
          return ('У вас средний уровень дохода ');
         } else if (this.budgetDay < 600 && this.budgetDay >= 0){
          return (' К сожалению у вас уровень дохода ниже среднего ');
         } else if (this.budgetDay < 0){
          return (' Что то пошло не так ');
         }    
     }
     
     // расходы за месяц 
     getExpensesMonth (){
        for (const key in this.expenses) {
            this.expensesMonth += + this.expenses[key];
        }
    }
    
    // депозит 
    getInfoDepodit(){
        this.deposit  = confirm ('Есть ли у вас депозит в банке?');
        if(this.deposit){
            do {
                this.percenDeposit = prompt (' Какой у Вас годовой процент?', 10);
            }
            while (!isNumber(this.percenDeposit));
            
            do {
                this.moneyDeposit = prompt (' Какая сумма у вас заложена', 10000);
            }
            while (!isNumber(this.moneyDeposit));
        }
    }
    
    // накопеления за период 
    calcSavedMoney(){
        return this.budgetMonth * periodSelect.value;    
    }
    
    // бегунок 
    range(){ 
        const inp = document.querySelector ('input[type=range]');
        periodAmount.innerHTML = inp.value;         
    }
    
    
    eventsListeners(){
        start.disabled = true;
        salaryAmount.addEventListener('input', () => {
            start.disabled = salaryAmount.value === '';
        });
    
    
        start.addEventListener('click', this.start.bind(this));
        cencel.addEventListener('click', this.reset.bind(this));
    
        btnExpenses.addEventListener('click', this.addExpensesBlock);
    
        btnIncome.addEventListener ('click', this.addIncomeBlock);
    
        periodSelect.addEventListener('input', this.range);
    
        const statusIncome = this.getStatusIncome(); //  уровень дохода 
    
        this.getInfoDepodit();
    
    } 
} 


const appData = new AppData();
console.log('appData: ', appData);
appData.eventsListeners();

















 