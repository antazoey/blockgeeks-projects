import Web3 from "web3";

function printBlock(block) {
    let table = document.getElementById('blocks');
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = block.number;
    cell2.innerHTML = block.hash;
    cell3.innerHTML = block.timestamp;

}

export async function updateBlocks() {
    const url = "https://rinkeby.infura.io/v3/f0f5243a226d40e48cfec3e753ee640d";
    const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider(url));
    let latest = await web3.eth.getBlockNumber();
    // get ten latest blocks
    for (let i = 0; i < 10; i++) {
        let block = await web3.eth.getBlock(latest-i);
        printBlock(block);
    }
}

function componentTitle() {
    const b = document.createElement('b');
    const element = document.createElement('div');
    element.innerHTML = "Block Explorer for main.net";
    element.style.marginTop = "10px";
    b.appendChild(element);
    return b;
}

function componentTable() {
    const element = document.createElement('table');
    element.id = 'blocks';
    element.style.border = "1px solid black";
    element.style.marginTop = "10px";
    element.width = "100%";
    return element;
}

function componentBlockNumber() {
    const element = document.createElement('th');
    element.innerHTML = "Number";
    return element;
}

function componentBlockHash() {
    const element = document.createElement('th');
    element.innerHTML = "Hash";
    return element;
}

function componentTimestamp () {
    const element = document.createElement('th');
    element.innerHTML = "Timestamp";
    return element;
}

export function componentExplorer() {
    const title = componentTitle();
    const space = document.createElement('br');
    const explorer = document.createElement('div');
    const row1 = document.createElement('tr');
    const table = componentTable();
    const number = componentBlockNumber();
    const hash = componentBlockHash();
    const timestamp = componentTimestamp();
    row1.appendChild(number);
    row1.appendChild(hash);
    row1.appendChild(timestamp);
    table.appendChild(row1);
    explorer.appendChild(space);
    explorer.appendChild(title);
    explorer.appendChild(space);
    explorer.appendChild(table);
    explorer.id = 'explorer';
    explorer.width = '100%';
    return explorer;
}
