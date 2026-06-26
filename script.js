let other = "0";
let current = "0";
let opperator = "";
let last = "";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const add = () => Number(current)+Number(other);
const sub = () => other-current;
const mul = () => current*other;
const div = () => {
    if(current==0){
        return "MathErr";
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
    let btn = e.target.textContent;
    if (isNumber(btn)){
        updateDisplay("opp");
        if(last == "opp"){
        other = current;
        current = "0";
        }
        if(current.replace(".","").length < 7){
            if(current == "0"){
                current = ""
            }
            current+=btn;
            colorButton(e.target);
        updateDisplay("num");
        }
        last = "num";
        return;
    }

    if(btn == ","){
        updateDisplay("opp");
        if(last == "opp"){
        other = current;
        current = "0";
        }
        if(current.replace(".","") == current){
            current += ".";
            colorButton(e.target);
        }
        updateDisplay("num");
        last = ",";
        return;
    }

    if(btn=="AC"){
        updateDisplay("opp");
        current = "0";
        other = "0";
        opperator = "";
        colorButton(e.target);
        updateDisplay("num");
        last = "AC";
        return;
    }

    if(e.target.classList[0] == "opp"){
        updateDisplay("opp");
        if(last == "=" || last == "AC"){
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
                updateDisplay("MathErr");
                return;
            }
        }

        opperator=btn;
        last = "opp";
        updateDisplay("num");
        e.target.style.backgroundColor = "white";
    }

    if(btn=="="){
        if(last == "opp"){
            return;
        }
        updateDisplay("opp");
        colorButton(e.target)
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

async function updateDisplay (type) {
    if(type=="num"){
        if(current.toString().replace(".","").length>7){
            display.textContent = "Too Big";
        
            if(current.toString().includes(".") && current.indexOf(".")<8){
                display.textContent = current.toString().slice(0,8);
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
    display.textContent = "";
    await delay(20);
    if(type.toString().replace(".","").length>99){
        
        display.textContent = "Too Big"
        if(type.toString().includes(".") && current.indexOf(".")<8){
            display.textContent = type.toString().slice(0,8);
        }
        return;
    }
    display.textContent = type;  

}

async function colorButton (target) {
    target.style.borderStyle = "inset";
    target.style.backgroundColor = "#FFFFFF";
    if(target.textContent == "="){
        target.style.backgroundColor = "#F0F0F0"
    }
    await delay(100);
    target.style.backgroundColor = "#F0F0F0";
    target.style.borderStyle = "outset";
    if(target.textContent == "="){
        target.style.backgroundColor = "#b3b3b3"
    }
}

addEvents();
updateDisplay("num");