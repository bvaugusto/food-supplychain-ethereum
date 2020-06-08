//instancia o web3
if (typeof web3 !== 'undefined') {
  console.log('Usando MetaMask');
  web3 = new Web3(web3.currentProvider);
} else {
  console.log('Usando Ganache');
  web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
}

//define conta padrão
web3.eth.defaultAccount = web3.eth.coinbase;

//ABI do contrato
var contractABI = web3.eth.contract([
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      },
      {
        "name": "_recipient",
        "type": "string"
      },
      {
        "name": "_estimatedReceivingDate",
        "type": "string"
      },
      {
        "name": "_transportType",
        "type": "string"
      }
    ],
    "name": "setDistributor",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getProducerById",
    "outputs": [
      {
        "name": "_id",
        "type": "uint256"
      },
      {
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_description",
        "type": "string"
      },
      {
        "name": "_weight",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      },
      {
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_description",
        "type": "string"
      },
      {
        "name": "_weight",
        "type": "string"
      }
    ],
    "name": "setProducer",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      },
      {
        "name": "_resellerName",
        "type": "string"
      },
      {
        "name": "_storageLocation",
        "type": "string"
      },
      {
        "name": "_temperature",
        "type": "string"
      }
    ],
    "name": "setDealer",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [Array],
    "name": "distributors",
    "outputs": [Array],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      },
      {
        "name": "_product",
        "type": "string"
      },
      {
        "name": "_shelfLife",
        "type": "string"
      },
      {
        "name": "_packageType",
        "type": "string"
      }
    ],
    "name": "setManufacturer",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getDistributorById",
    "outputs": [
      {
        "name": "_id",
        "type": "uint256"
      },
      {
        "name": "_recipient",
        "type": "string"
      },
      {
        "name": "_estimatedReceivingDate",
        "type": "string"
      },
      {
        "name": "_transportType",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [Array],
    "name": "manufacturers",
    "outputs": [Array],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [Array],
    "name": "producers",
    "outputs": [Array],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getDealerById",
    "outputs": [
      {
        "name": "_id",
        "type": "uint256"
      },
      {
        "name": "_resellerName",
        "type": "string"
      },
      {
        "name": "_storageLocation",
        "type": "string"
      },
      {
        "name": "_temperature",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getManufacturerById",
    "outputs": [
      {
        "name": "_id",
        "type": "uint256"
      },
      {
        "name": "_product",
        "type": "string"
      },
      {
        "name": "_shelfLife",
        "type": "string"
      },
      {
        "name": "_packageType",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [Array],
    "name": "dealers",
    "outputs": [Array],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]);

//aponta para publicado
var contract = contractABI.at('0xff0c0bd1bf4c7e23d0d136b08836e9e3854e8f35');

//preenche carteiras para comprar
var accounts = web3.eth.accounts;
var option = '';
for (var i = 0; i < accounts.length; i++) {
  option += '<option value="' + accounts[i] + '">' + accounts[i] + '</option>';
}
$('#carteira').append(option);

//ação do botão anunciar
$('#btnAnunciar').click(function () {
  var nome = $('#nome').val();
  var descricao = $('#descricao').val();
  var preco = $('#preco').val();
  contract.setProducer(nome, descricao, web3.toWei(preco, "ether"), { from: $('#carteira').val(), gas: 3000000 });
});

//mostrando os itens a venda
function itensvenda() {
  contract.getArticlesForSale(function (error, result) {
    if (!error) {
      $.each(result, function (index, value) {
        contract.getProducer(value, function (error, result) {
          if (!error) {
            var card =
              '<div class="card">' +
              '  <div class="card-body">' +
              '    <h5 class="card-title">' + result[0] + '</h5>' +
              '    <h6 class="card-subtitle mb-2 text-muted">ETH ' + web3.fromWei(result[2], "ether") + '</h6>' +
              '    <p class="card-text">' + result[1] + '</p>' +
              '    <a href="#void" class="card-link" onclick="comprar(' + value + ');">Comprar</a>' +
              '  </div>' +
              '</div>';
            $('#produtos').append(card);
          } else {
            console.log('error => ', error);
          }
        });
      });
    } else {
      console.log(error);
    }
  });
}

function comprar(id) {
  contract.getArticle(id, function (error, result) {
    if (!error) {
      contract.buyArticle(id, { from: $('#carteira').val(), value: result[2], gas: 3000000 });
    } else {
      console.log(error);
    }
  });
}