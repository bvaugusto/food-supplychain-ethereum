var globContract = false;

window.addEventListener("load", function(){
  //instancia o web3
  if (typeof web3 !== 'undefined') {
    console.log('Usando MetaMask');
    web3 = new Web3(web3.currentProvider);
  } else {
    console.log('Usando Ganache');
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  }

  //define conta padrão
  web3.eth.defaultAccount = web3.eth.coinbase;

  //ABI do contrato
  var contractABI = web3.eth.contract([
    {
      "constant": false,
      "inputs": [
        {
          "name": "_chainId",
          "type": "uint256"
        },
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
      "constant": false,
      "inputs": [
        {
          "name": "_chainId",
          "type": "uint256"
        },
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
      "constant": false,
      "inputs": [
        {
          "name": "_chainId",
          "type": "uint256"
        },
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
          "name": "_category",
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
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "dealers",
      "outputs": [
        {
          "name": "id",
          "type": "uint256"
        },
        {
          "name": "seller",
          "type": "address"
        },
        {
          "name": "resellerName",
          "type": "string"
        },
        {
          "name": "storageLocation",
          "type": "string"
        },
        {
          "name": "temperature",
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
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "distributors",
      "outputs": [
        {
          "name": "id",
          "type": "uint256"
        },
        {
          "name": "seller",
          "type": "address"
        },
        {
          "name": "recipient",
          "type": "string"
        },
        {
          "name": "estimatedReceivingDate",
          "type": "string"
        },
        {
          "name": "transportType",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getchains",
      "outputs": [
        {
          "name": "",
          "type": "uint256[]"
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
      "name": "getDealerById",
      "outputs": [
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
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
      "name": "getDistributorById",
      "outputs": [
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
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
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
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
          "name": "_chainId",
          "type": "uint256"
        }
      ],
      "name": "getNextAction",
      "outputs": [
        {
          "name": "",
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
      "name": "getProducerById",
      "outputs": [
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getProducersChains",
      "outputs": [
        {
          "name": "",
          "type": "uint256[]"
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
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "manufacturers",
      "outputs": [
        {
          "name": "id",
          "type": "uint256"
        },
        {
          "name": "seller",
          "type": "address"
        },
        {
          "name": "product",
          "type": "string"
        },
        {
          "name": "shelfLife",
          "type": "string"
        },
        {
          "name": "packageType",
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
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "nextAction",
      "outputs": [
        {
          "name": "",
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
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "producers",
      "outputs": [
        {
          "name": "id",
          "type": "uint256"
        },
        {
          "name": "seller",
          "type": "address"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "category",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "weight",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]);

  //aponta para publicado
  globContract = contractABI.at('0x06ed600bA7C46a7673b348393e4960AC030BAE63');

  buildChainsTable();

});


//preenche carteiras para comprar
/*var accounts = web3.eth.accounts;
var option = '';
for (var i = 0; i < accounts.length; i++) {
  option += '<option value="' + accounts[i] + '">' + accounts[i] + '</option>';
}

$('#carteira').append(option);*/

/*//ação do botão anunciar
$('#btnAnunciar').click(function () {
  var nome = $('#nome').val();
  var descricao = $('#descricao').val();
  var preco = $('#preco').val();
  contract.setProducer(nome, descricao, web3.toWei(preco, "ether"), { from: $('#carteira').val(), gas: 3000000 });
});*/

function buildChainsTable() {
  globContract.getchains(function (error, result) {
    if (!error) {
      let rows = "filipe";

      $.each(result, function (index, value) {
        globContract.getNextAction(value, function (error, result){
          let tr = "";

          if (!error) {
            if (result == 'MANUFACTURER') {
              tr = `<tr>
                      <td>`+value+`</td>
                      <td><span class="badge badge-primary">Processando</span></td>
                      <td><span class="badge badge-secondary">Indisponível</span> </td>
                      <td><span class="badge badge-secondary">Indisponível</span> </td>
                      <td><span class="badge badge-secondary">Indisponível</span> </td>
                      <td><i class="far fa-eye"></i></td>
                    </tr>`;
            } else if (result == 'DISTRIBUTOR') {
              tr = `<tr>
                      <td>`+value+`</td>
                      <td><span class="badge badge-success">Concluído</span></td>
                      <td><span class="badge badge-warning">Processando</span> </td>
                      <td><span class="badge badge-secondary">Indisponível</span> </td>
                      <td><span class="badge badge-secondary">Indisponível</span> </td>
                      <td><i class="far fa-eye"></i></td>
                    </tr>`;
            } else if (result == 'DEALER') {
              tr = `<tr>
                      <td>`+value+`</td>
                      <td><span class="badge badge-success">Concluído</span></td>
                      <td><span class="badge badge-success">Concluído</span> </td>
                      <td><span class="badge badge-warning">processando</span> </td>
                      <td><span class="badge badge-secondary">Indisponível</span> </td>
                      <td><i class="far fa-eye"></i></td>
                    </tr>`;
            } else if (result == 'DONE') {
              tr = `<tr>
                      <td>`+value+`</td>
                      <td><span class="badge badge-success">Concluído</span></td>
                      <td><span class="badge badge-success">Concluído</span> </td>
                      <td><span class="badge badge-success">Concluído</span> </td>
                      <td><span class="badge badge-success">Concluído</span> </td>
                      <td><i class="far fa-eye"></i></td>
                    </tr>`;
            }

            $("#chainsTable").find("tbody").append(tr);
          } else {
            console.log(error);
          }
        });
      });

    } else {
      console.log(error);
    }
  });
}

// Produtores
function producersInChains() {
  globContract.getProducersChains(function (error, result) {
    if (!error) {
      $.each(result, function (index, value) {
        globContract.getProducerById(value, function (error, result) {
          console.log(result);
          // if (!error) {
          //   var card =
          //     '<div class="card">' +
          //     '  <div class="card-body">' +
          //     '    <h5 class="card-title">' + result[0] + '</h5>' +
          //     '    <h6 class="card-subtitle mb-2 text-muted">ETH ' + web3.fromWei(result[2], "ether") + '</h6>' +
          //     '    <p class="card-text">' + result[1] + '</p>' +
          //     '  </div>' +
          //     '</div>';
          //   $('#chains').append(card);
          // } else {
          //   console.log("else");
          //   console.log('error => ', error);
          // }
        });
      });
    } else {
      console.log(error);
    }
  });
}

function comprar(id) {
  globContract.getArticle(id, function (error, result) {
    if (!error) {
      globContract.buyArticle(id, { from: $('#carteira').val(), value: result[2], gas: 3000000 });
    } else {
      console.log(error);
    }
  });
}