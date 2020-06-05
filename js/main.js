let money = 30000,
    income = 'Фриланс',
    addExpenses = 'Ипотека, Комуналка, Бензин',
    deposit = true,
    mission = 300000,
    period = 12;  

// Вывели тип значений в консоль
console.log(typeof money); 
console.log(typeof income);
console.log(typeof deposit);

// Вывели длинну строки в консоли 
console.log (addExpenses.length);

// Вывели в консоль фразу
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

// Привели строку к нижнему регистру и разбили на массив
console.log(addExpenses.toLowerCase());

console.log(addExpenses.split(','));

// Вычисляем дневной бюджет
let budgetDay,
    incomeMoney = 5000;
budgetDay =(incomeMoney + money) /30;
console.log(budgetDay.toFixed(2));


