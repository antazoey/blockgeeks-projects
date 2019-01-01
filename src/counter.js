import Web3 from "web3"

function initContract() {
    const url = "https://rinkeby.infura.io/v3/f0f5243a226d40e48cfec3e753ee640d";
    const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider(url));
    let address = "0xd2d424cd70b687a6f2cedd0b1024399c8e8b2dd3";
    const abi = [
        {
            "constant": false,
            "inputs": [],
            "name": "decrement",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "increment",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getCounter",
            "outputs": [
                {
                    "name": "",
                    "type": "int256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    return new web3.eth.Contract(abi, address);
}

function printNetwork() {
    web3.version.getNetwork((err, netId) => {
        switch (netId) {
            case "1":
                console.log('This is mainnet');
                break;
            case "2":
                console.log('This is the deprecated Morden test network.');
                break;
            case "3":
                console.log('This is the ropsten test network.');
                break;
            default:
                console.log(`This is an unknown network ${netId}.`);
        }
    });
}

export const contract = initContract();

export const name = "Counter";
