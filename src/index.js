import { componentCounter } from "./counter_comp";
import { componentExplorer} from "./explorer";

function main() {
    document.body.appendChild(componentCounter());
    document.body.appendChild(document.createElement('hr'));
    document.body.appendChild(componentExplorer());
}

main();
