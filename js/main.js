let num = 266219;

// создали массив 
let nums =(('' + num).split(''));
let number = 1;
console.log(nums);

// Произвели умножение массива
nums.forEach(function(e) {number *= e;});
console.log(number);

// Возвели в степень
console.log(number ** 3);

// Оставили первые 2 числа 
console.log(String(number ** 3).slice(0,2));

