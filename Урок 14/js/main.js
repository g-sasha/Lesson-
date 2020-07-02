'use strict';

function DomElement (selector, height, width, bg, fontSize){
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

let domElem = new DomElement ('.mazda', '1.6', '2.4', 'red', '16');
console.log('domElem: ', domElem);

let src = document.getElementsByTagName('script');

DomElement.prototype.elem = function(){
    if(domElem.selector.substring(0 , 1) === '.'){
        let newDiv = document.createElement('div');
        newDiv.classList.add('block');
        console.log(newDiv);
        newDiv.style.cssText = `
        height: 20px;
        width: 50px;
        background: red;
        font-size: 16px;
        `;
        newDiv.innerHTML = '<span> Привет </span> ';
        document.body.insertAdjacentElement('afterend', newDiv);
    }  else if (domElem.selector.substring(0 , 1) === '#') {
        let newId = document.createElement('div');
        newId.id = 'best';
        console.log('newId: ', newId);
    } 
    
};
domElem.elem();



let newDomElement = Object.create(DomElement);
console.log('newDomElement: ', newDomElement);
