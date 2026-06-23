let other = "0";
let current = "0";
let opperator = "";
let last = "";

const add = () => Number(current)+Number(other);
const sub = () => other-current;
const mul = () => current*other;
const div = () => other/current;

function operate (){
    if (opperator == "+") {
        return add();
    }
    if (opperator == "-") {
        return sub();
    }
    if (opperator == "*") {
        return mul();
    }
    if (opperator == "/") {
        return div();
    }
}

const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");


function addEvents () {
    for (const btn of buttons) {
        btn.addEventListener("click", btnClick)    
    }
}

function btnClick (e) {
    let btn = e.target.textContent;
    if (isNumber(btn)){
        if(last == "opp"){
        other = current;
        current = "0";
        }
        if(current.replace(".","").length < 7){
            if(current == "0"){
                current = ""
            }
            current+=btn;
        updateDisplay("num");
        }
        last = "num";
        return;
    }

    if(btn == ","){
        if(current.replace(".","") == current){
            current += ".";
        }
        updateDisplay("num");
        return;
    }

    if(btn=="AC"){
        current = "0";
        other = "0";
        opperator = "";
        updateDisplay("num");
        last = "AC"
        return;
    }

    if(e.target.classList[0] == "opp"){
        if(last=="opp"){
            opperator = btn;
            return;
        }
        if(opperator!=""){
            current=operate().toString();
        }
        
        opperator=btn;
        last = "opp";
        updateDisplay("num");
    }

    if(btn=="="){
        updateDisplay(operate())
        current = "0";
        other = "0";
        opperator = "";
        last = "="
        return;
    }
    
}

function isNumber (number) {
    return Number(number) < 10;
}

function updateDisplay (type) {
    if(type=="num"){
        if(current.replace(".","").length>7){
            display.textContent = "Too Big"
            if(current.replace(".","") != current){
                display.textContent = current.slice(0,8);
            }
            return;
        }
        display.textContent = current;                 
    }
    else{
        if(type.toString().replace(".","").length>7){
            display.textContent = "Too Big"
            if(type.toString().replace(".","") != type.toString){
                display.textContent = type.toString().slice(0,8);
            }
            return;
        }
        display.textContent = type;  
    }
}

addEvents();
updateDisplay("num");