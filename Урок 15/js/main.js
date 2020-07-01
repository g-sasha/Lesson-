'use strict';

class First {
    hello(){
        console.log('Привет я метод родителя!');
    }
    
}
class Second extends First{
    hello(){
        first1.hello();
        console.log('А я наследуемый метод!');  
    }
}
const first1 = new First;
const second1 = new Second;

first1.hello();
second1.hello();
