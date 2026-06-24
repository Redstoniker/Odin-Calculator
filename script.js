let other = "0";
let current = "0";
let opperator = "";
let last = "";

const add = () => Number(current)+Number(other);
const sub = () => other-current;
const mul = () => current*other;
const div = () => {
    if(current==0){
        return "Math Err";
    }
    return other/current;
}

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
const opps = document.querySelectorAll(".opp");


function addEvents () {
    for (const btn of buttons) {
        btn.addEventListener("click", btnClick)    
    }
}

function btnClick (e) {
    updateDisplay("opp");
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
        if(last == "="){
            return;
        }
        if(last=="opp"){
            opperator = btn;
            e.target.style.backgroundColor = "white";
            return;
        }
        if(opperator!=""){
            current=operate().toString();
            if(current=="Math Err"){
                current = "0";
                other = "0";
                opperator = "";
                last = "=";
                updateDisplay("Math Err");
                return;
            }
        }

        opperator=btn;
        last = "opp";
        updateDisplay("num");
        e.target.style.backgroundColor = "white";
    }

    if(btn=="="){
        updateDisplay(operate())
        current = "0";
        other = "0";
        opperator = "";
        last = "=";
        return;
    }
    
}

function isNumber (number) {
    return Number(number) < 10;
}

function updateDisplay (type) {
    if(type=="num"){
        if(typeof(current) == "string"){
            display.textContent = current;
            return;
        }
        if(current.toString().replace(".","").length>7){
            display.textContent = "Too Big"
            if(current.replace(".","") != current){
                display.textContent = current.slice(0,8);
            }
            return;
        }
        display.textContent = current;   
        return;              
    }
    if(type=="opp"){
        for (const button of opps) {
            button.style.backgroundColor = "#b3b3b3";
        }
        return;
    }

    if(type.toString().replace(".","").length>7){
        display.textContent = "Too Big"
        if(type.toString().replace(".","") != type.toString){
            display.textContent = type.toString().slice(0,8);
        }
        return;
    }
    display.textContent = type;  

}

addEvents();
updateDisplay("num");