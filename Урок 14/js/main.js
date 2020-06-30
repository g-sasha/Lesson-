'use strict';

function DomElement (selector, height, width, bg, fontSize){
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

let domElement = new DomElement ('.mazda', '1.6', '2.4', 'red', '16')
console.log('domElem: ', domElement);


DomElement.prototype.elem = function(){
    if(domElement.selector.substring(0 , 1) === '.'){
        let newDiv = document.createElement('div');
        newDiv.classList.add('block');
        console.log(newDiv);
        newDiv.style.cssText = `
        height: 20px;
        width: 50px;
        background: red;
        font-size: 16px;
        `;
        newDiv.innerHTML = 'Привет ';
    }  else if (domElement.selector.substring(0 , 1) === '#') {
        let newId = document.createElement('div');
        newId.id = 'best';
        console.log('newId: ', newId);
    } 
    


};
domElement.elem();



let newDomElement = Object.create(DomElement);
console.log('newDomElement: ', newDomElement);

