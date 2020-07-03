'use strict';

function DomElement (selector, height, width, bg, fontSize, text){
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.text = text;
}

let src = document.getElementsByTagName('script');

DomElement.prototype.createElement = function(){
    let newDiv;
    if(this.selector.substring(0 , 1) === '.'){
        newDiv = document.createElement('div');
        newDiv.classList.add(this.selector);
    }  else if (this.selector.substring(0 , 1) === '#') {
        newDiv = document.createElement('div');
        newDiv.id = this.selector;
    } 
        newDiv.style.cssText = `
        height: ${this.height}px;
        width: ${this.width}px;
        background-color : ${this.bg};
        font-size: ${this.fontSize}px;
        `;
        newDiv.textContent = `${this.text}`;
        document.body.insertAdjacentElement('afterend', newDiv);
};

let domElem = new DomElement ('#mazda', '100', '150', 'red', '16', 'привет');
domElem.createElement();


let newDomElement = Object.create(DomElement);
console.log('newDomElement: ', newDomElement);