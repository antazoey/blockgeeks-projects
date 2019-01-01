import _ from 'lodash';
import $ from 'jquery';
import { contract, name } from "./counter.js";

function componentTitle() {
    const element = document.createElement('div');
    const titleArray = ['Sup', name];
    element.innerHTML = _.join(titleArray, ' ');
    return element;
}

function valueComponent() {
    const element = document.createElement('p');
    element.innerHTML = "...";
    return element;
}

function componentButton(data) {
    const btn = document.createElement("button");
    const t = document.createTextNode(data);
    btn.appendChild(t);
    return btn;
}

async function loadCurrentCount(valComp) {
    const methods = contract.methods;
    if (methods) {
        const result = await methods.getCounter().call();
        if (valComp) {
            valComp.innerHTML = result;
        } else {
            console.log("Error with init contract");
        }
    }
}

function addCounter(i) {
    let comp = $('#valcomp');
    if (comp) {
        let v = parseInt(comp.html(), 10);
        comp.empty();
        comp.html(v + i);
    } else {
        console.log("error with comp");
        console.log(comp);
    }
}

async function incrementCounter() {
    const methods = contract.methods;
    const acct = web3.eth.defaultAccount;
    try {
        const tx = await methods.increment().send( {from: acct} );
        console.log(tx);
        addCounter(1);
    } catch(err) {
        console.log(err);
    }
}

async function decrementCounter() {
    const methods = contract.methods;
    const acct = web3.eth.defaultAccount;
    try {
        const tx = await methods.decrement().send( {from: acct} );
        console.log(tx);
        addCounter(1);
    } catch(err) {
        console.log(err);
    }
}

function reset() {
    const comp = $('#valcomp');
    if (comp) {
        comp.empty();
        comp.html(0);
    }
}

function main() {
    console.log("Welcome friends");
    const title = componentTitle();
    const valComp = valueComponent();
    const inc_btn = componentButton("Increment");
    const dec_btn = componentButton("Decrement");
    const reset_btn = componentButton("Reset");
    valComp.id = "valcomp";
    inc_btn.id = "increment";
    dec_btn.id = "decrement";
    reset_btn.id = "reset";
    inc_btn.onclick = incrementCounter;
    dec_btn.onclick = decrementCounter;
    reset_btn.onclick = reset;
    loadCurrentCount(valComp);
    document.body.appendChild(title);
    document.body.appendChild(valComp);
    document.body.appendChild(inc_btn);
    document.body.appendChild(dec_btn);
    document.body.appendChild(reset_btn);
}

main();
