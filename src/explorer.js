

function componentTitle() {
    const element = document.createElement('div');
    element.innerHTML = "Block Explorer for main.net";
    return element;
}

function componentTable() {
    const element = document.createElement('table');
    element.id = 'blocks';
    element.style.border = "1px solid black";
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
    element.innerHTML = "Hash";
    return element;
}

export function componentExplorer() {
    const title = componentTitle();
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
    explorer.appendChild(title);
    explorer.appendChild(table);
    explorer.id = 'explorer';
    explorer.width = '100%';
    return explorer;
}
