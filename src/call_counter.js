import { contract } from "./counter.js";
import $ from "jquery";

export async function loadCurrentCount(valComp) {
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

export function addCounter(i) {
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

export async function incrementCounter() {
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

export async function decrementCounter() {
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

export function reset() {
    const comp = $('#valcomp');
    if (comp) {
        comp.empty();
        comp.html(0);
    }
}