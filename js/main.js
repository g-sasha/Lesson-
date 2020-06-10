let 
    income = 'Фриланс',    
    deposit = true,
    mission = 300000,
    period = 12;  


// Выводим месячный доход в выплывающее окно (number)
let money = +prompt('Ваш месячный доход?', '35000');


// перчечисляем расходы (string)
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Ипотека, кредит');
console.log(addExpenses.split(','));


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



let expenses1 = prompt ('Введите обязательную статью расходов?', 'Ипотека');

let amount1 = +prompt (' Во сколько Вам это обойдется?', '12300')

let expenses2 = prompt ('Введите обязательную статью расходов?', 'Кредит');

let amount2 = +prompt (' Во сколько Вам это обойдется?','2000')



// Вычисляем расходы 
let getExpensesMonth = function(a, b) {
    return a + b;
 };

let expensesMonth = getExpensesMonth (amount1, amount2);
console.log('Расходы: ', expensesMonth);

// Вычисляем свободные средства 
let getAccumulatedMonth = function (a, b){
    return a-b;
};

let accumulatedMonth = getAccumulatedMonth (money, expensesMonth)
console.log('Свободные средства: ', accumulatedMonth);


// Вычисляем за сколько месяцев добьемся цели 
let getTargetMonth = function (a, b){
    console.log (+ (Math.ceil( a / b)));
}
getTargetMonth(mission, accumulatedMonth);

// Бюджет на день
budgetDay = accumulatedMonth/30;
console.log('бюджет на день: ' + (budgetDay.toFixed(2)));

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