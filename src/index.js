import _ from 'lodash';
import { name } from "./counter.js";
import * as Contract from "./call_counter.js";

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
    inc_btn.onclick = Contract.incrementCounter;
    dec_btn.onclick = Contract.decrementCounter;
    reset_btn.onclick = Contract.reset;
    Contract.loadCurrentCount(valComp);
    document.body.appendChild(title);
    document.body.appendChild(valComp);
    document.body.appendChild(inc_btn);
    document.body.appendChild(dec_btn);
    document.body.appendChild(reset_btn);
}

main();
