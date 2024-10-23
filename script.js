
// Elementos em HTML
let select1 = document.querySelector("#from-select");
let select2 = document.querySelector("#to-select"); //selects

const button = document.querySelector("button");
let input = document.querySelector("input");

let leftSigla = document.querySelector("#left-title"); //siglas
let rightSigla = document.querySelector("#right-title");

let toBeConverted = document.querySelector("#left-value"); //valores
let convertedValue = document.querySelector("#right-value");

let leftLogo = document.querySelector("#convert-logo");     //bandeiras de países / símbolos das moedas
let rightLogo = document.querySelector("#converted-logo");

const invertButton = document.querySelector("#invert-button")   //botão de inverter 

function formatarMoeda(input) {

    let valor = input.value.replace(/\D/g, '');  // Remove todos os caracteres que não são dígitos

    valor = (valor / 100).toFixed(2); // pega o valor decimal
    valor = valor.replace('.', ',');  // ponto --> vírgula 
    valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // ponto 1.000

    input.value = valor;
}

//taxas de conversão
const conversion = {

    "R$ Real": { //moeda a ser convertida
        "R$ Real": 1,
        "U$ Dólar": 0.17507,
        "BTC Bitcoin": 0.0000026,
        "€ Euro": 0.1625,
        "£ Libra": 0.1354,
        "¥ Iene": 26.4830,
        "ETH Ether": 0.000067,
        "₣ Franco Suiço": 0.15,
    },

    "U$ Dólar": {
        "R$ Real": 5.7171,
        "U$ Dólar": 1,
        "BTC Bitcoin": 0.000015,
        "€ Euro": 0.9246,
        "£ Libra": 0.7702,
        "¥ Iene": 150.70,
        "ETH Ether": 0.00038,
        "₣ Franco Suiço": 0.87,
    },


    "BTC Bitcoin": {
        "R$ Real": 384138.31,
        "U$ Dólar": 67505.11,
        "BTC Bitcoin": 1,
        "€ Euro": 62419.82,
        "£ Libra": 51995.40,
        "¥ Iene": 10174183.92,
        "ETH Ether": 25.54,
        "₣ Franco Suiço": 57029.03,
    },

    "€ Euro": {
        "R$ Real": 6.1561,
        "U$ Dólar": 1.0816,
        "BTC Bitcoin": 0.000016,
        "€ Euro": 1,
        "£ Libra": 0.8330,
        "¥ Iene": 162.9700,
        "ETH Ether": 0.00041,
        "₣ Franco Suiço": 0.93,
    },

    "£ Libra": {
        "R$ Real": 7.3861,
        "U$ Dólar": 1.2982,
        "BTC Bitcoin": 0.000019,
        "€ Euro": 1,
        "£ Libra": 1.2004,
        "¥ Iene": 195.56,
        "ETH Ether": 0.00049,
        "₣ Franco Suiço": 1.12,
    },

    "¥ Iene": {
        "R$ Real": 0.0377,
        "U$ Dólar": 0.0066,
        "BTC Bitcoin": 0.00,
        "€ Euro": 0.0061,
        "£ Libra": 0.0051,
        "¥ Iene": 1,
        "ETH Ether": 0.0000025,
        "₣ Franco Suiço": 0.0057,
    },

    "ETH Ether": {
        "R$ Real": 14963.28,
        "U$ Dólar": 2623.36,
        "BTC Bitcoin": 0.039,
        "€ Euro": 2425.29,
        "£ Libra": 2022.26,
        "¥ Iene": 395754.08,
        "ETH Ether": 1,
        "₣ Franco Suiço": 2159.11,
    },

    "₣ Franco Suiço": {
        "R$ Real": 6.58,
        "U$ Dólar": 1.15 ,
        "BTC Bitcoin": 0.000018,
        "€ Euro": 1.07,
        "£ Libra": 0.89,
        "¥ Iene": 176.23,
        "ETH Ether": 0.00046,
        "₣ Franco Suiço": 1,
    }
};

const siglas = { //siglas das moedas

    "R$ Real": "BRL",
    "U$ Dólar": "USD",
    "BTC Bitcoin": "BTC",
    "€ Euro": "EUR",
    "£ Libra": "GBP",
    "¥ Iene": "JPY",
    "ETH Ether": "ETH",
    "₣ Franco Suiço": "CHF",
};


const images = { //url das imagens para alterar 

    "R$ Real": "./assets/brasil 2.png",
    "U$ Dólar": "./assets/eua.png",
    "BTC Bitcoin": "./assets/btc.png",
    "€ Euro": "./assets/eu.png",
    "£ Libra": "./assets/uk.png",
    "¥ Iene": "./assets/jpy.png",
    "ETH Ether": "./assets/eth.png",
    "₣ Franco Suiço": "./assets/CHF.png",
}

//função de exibição

//exibição de cripto (verifica se é uma criptomoeda e aumenta os caracteres após a vírgula)
function crypto() {

    if (siglas[select2.value] === "BTC" || siglas[select2.value] === "ETH") {
        convertedValue.textContent = `${siglas[select2.value]} ${result.toFixed(5)}`;
    }
}

//exibição geral 
function showValues() {

    let valorEntrada = parseFloat(input.value.replace('.', '').replace(',', '.'));


    //esquerda
    leftSigla.textContent = siglas[select1.value];
    leftLogo.src = images[select1.value];

    toBeConverted.textContent = new Intl.NumberFormat("pt-br", { //formatação do número
        style: "currency",
        currency: siglas[select1.value]
    }).format(valorEntrada)


    //direita
    rightSigla.textContent = siglas[select2.value];
    rightLogo.src = images[select2.value];

    convertedValue.textContent = new Intl.NumberFormat("pt-br", {  //formatação do número
        style: "currency",
        currency: siglas[select2.value]
    }).format(parseFloat(result))

}

//clique no botão

button.addEventListener("click", function() {

    let enteredValue = input.value.replace(/\./g, '').replace(',', '.'); //troca as vírgulas e pontos para realizar operações

    if (select1.value === select2.value) {  //verifica se os selects são iguais
        result = enteredValue;
    }

    else {
        result = enteredValue * conversion[select1.value][select2.value];
    }

    showValues(result);

    crypto();
})

invertButton.addEventListener("click", function () { //função para inverter os valores

    let temp = select1.value;
    select1.value = select2.value; //inversão
    select2.value = temp;

    button.click(); //simula o click no botão
})

//função para realizar conversão com enter:

input.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        button.click();
    }
})

// eventos de mudança

select1.addEventListener("change", function () {
    button.click();
})

select2.addEventListener("change", function () {
    button.click();
})
