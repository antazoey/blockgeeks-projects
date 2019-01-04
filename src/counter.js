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
            "constant": false,
            "inputs": [],
            "name": "reset",
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
        }
    ];
    return new web3.eth.Contract(abi, address);
}

export const contract = initContract();

export const name = "Counter";
