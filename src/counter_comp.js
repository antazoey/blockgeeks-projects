import * as Contract from "./call_counter";

function componentTitle() {
    const bold = document.createElement("strong");
    const text = document.createTextNode("Interact with the Counter.sol smart contract deployed" +
        "in Rinkeby test network");
    const element = document.createElement('div');
    bold.appendChild(text);
    element.appendChild(bold);
    return element;
}

function valueComponent() {
    const element = document.createElement('p');
    element.innerHTML = "...";
    element.style.color = "blue";
    return element;
}

function componentButton(data) {
    const btn = document.createElement("button");
    const t = document.createTextNode(data);
    btn.appendChild(t);
    return btn;
}

export function componentCounter() {
    const container = document.createElement('div');
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
    container.appendChild(title);
    container.appendChild(valComp);
    container.appendChild(inc_btn);
    container.appendChild(dec_btn);
    container.appendChild(reset_btn);
    return container;
}
