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

// Выводим месячный доход в выплывающее окно (number)
money = +prompt('Ваш месячный доход?');
console.log(money);

// перчечисляем расходы (string)
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExpenses.split(','));

// Депозит (boolean)
deposit  = confirm ('Есть ли у вас депозит в банке?')
console.log(deposit);


let expenses1 = prompt ('Введите обязательную статью расходов?');

let amount1 = +prompt (' Во сколько Вам это обойдется?')

let expenses2 = prompt ('Введите обязательную статью расходов?');

let amount2 = +prompt (' Во сколько Вам это обойдется?')

// Бюджет на месяц
let budgetMonth = (money - (amount1 - amount2))
console.log ('Бюджет на месяц: ' + budgetMonth);

// Достижение цели 
console.log ('Цель достигнуть за: ' + (Math.ceil( mission / budgetMonth)));

// Бюджет на день
budgetDay = budgetMonth/30;
console.log('бюджет на день: ' + (budgetDay.toFixed(2)));


// Уровень дохода
if (budgetDay >= 1200){
    console.log('У вас высокий уровень дохода');
 } else if (budgetDay <= 1200 && budgetDay >= 600){
  console.log(' У вас средний уровень доходамально ');
 } else if (budgetDay < 600 && budgetDay > 0){
  console.log(' К сожалению у вас уровень дохода ниже среднего ');
 } else if (budgetDay < 0){
  console.log(' Что то пошло не так ');
 }