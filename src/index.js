import { componentCounter } from "./counter_comp";
import { componentExplorer, updateBlocks } from "./explorer";

function main() {
    updateBlocks();
    document.body.appendChild(componentCounter());
    document.body.appendChild(document.createElement('hr'));
    document.body.appendChild(componentExplorer());
}

main();
