var globContract = false;

window.addEventListener("load", function () {
  //instancia o web3
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

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
  globContract = contractABI.at('0x775efddeb4c223207ce69f3ee362c9e5543dc2db');

  buildChainsTable();

});

//Preenche as cadeias de suprimentos
function buildChainsTable() {
  globContract.getchains(function (error, result) {
    if (!error) {
      let rows = "filipe";

      $.each(result, function (index, value) {
        globContract.getNextAction(value, function (error, result) {
          let tr = "";

          if (!error) {
            if (result == 'MANUFACTURER') {
              tr = `<tr>
                      <td>`+ value + `</td>
                      <td><span class="badge badge-primary">Processando</span></td>
                      <td><span class="badge badge-secondary">Indisponível</span> </td>
                      <td><span class="badge badge-secondary">Indisponível</span> </td>
                      <td><span class="badge badge-secondary">Indisponível</span> </td>
                    </tr>`;
            } else if (result == 'DISTRIBUTOR') {
              tr = `<tr>
                      <td>`+ value + `</td>
                      <td><span class="badge badge-success">Concluído</span></td>
                      <td><span class="badge badge-warning">Processando</span> </td>
                      <td><span class="badge badge-secondary">Indisponível</span> </td>
                      <td><span class="badge badge-secondary">Indisponível</span> </td>
                    </tr>`;
            } else if (result == 'DEALER') {
              tr = `<tr>
                      <td>`+ value + `</td>
                      <td><span class="badge badge-success">Concluído</span></td>
                      <td><span class="badge badge-success">Concluído</span> </td>
                      <td><span class="badge badge-warning">processando</span> </td>
                      <td><span class="badge badge-secondary">Indisponível</span> </td>
                    </tr>`;
            } else if (result == 'DONE') {
              tr = `<tr>
                      <td>`+ value + `</td>
                      <td><span class="badge badge-success">Concluído</span></td>
                      <td><span class="badge badge-success">Concluído</span> </td>
                      <td><span class="badge badge-success">Concluído</span> </td>
                      <td><span class="badge badge-success">Concluído</span> </td>
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

$('#btnAdicionarProdutor').click(function () {
  var prodId = $('#prodId').val();
  var name = $('#name').val();
  var category = $('#category').val();
  var description = $('#description').val();
  var weight = $('#weight').val();
  globContract.setProducer(prodId, name, category, description, weight, { from: $('#carteira').val(), gas: 3000000 });
});

$('#btnAdicionarFabricante').click(function () {
  var fabrId = $('#FabrId').val();
  var productF = $('#productF').val();
  var shelfLife = $('#shelfLife').val();
  var packageType = $('#packageType').val();
  globContract.setManufacturer(fabrId, fabrId, productF, shelfLife, packageType, { from: $('#carteira').val(), gas: 3000000 });
});

$('#btnAdicionarDistribuidor').click(function () {
  var distId = $('#DistId').val();
  var recipient = $('#recipient').val();
  var estimatedReceivingDate = $('#estimatedReceivingDate').val();
  var transportType = $('#transportType').val();
  globContract.setDistributor(distId, distId, recipient, estimatedReceivingDate, transportType, { from: $('#carteira').val(), gas: 3000000 });
});

$('#btnAdicionarRevendedor').click(function () {
  var revId = $('#RevId').val();
  var resellerName = $('#resellerName').val();
  var storageLocation = $('#storageLocation').val();
  var temperature = $('#temperature').val();
  globContract.setDealer(revId, revId, resellerName, storageLocation, temperature, { from: $('#carteira').val(), gas: 3000000 });
});

//Preencher Modal com a cadeia
$('#btnAnunciar').click(function () {
  var _chainId = $('#chainId').val();

  $("#producer").html("");
  $("#manufacturer").html("");
  $("#distributor").html("");
  $("#dealer").html("");

  globContract.getProducerById(_chainId, function (error, result) {
    if (!error) {
      var card =
        '<div class="card">' +
        '  <div class="card-body">' +
        '    <p class="card-text"> Nome: ' + result[0] + '</p>' +
        '    <p class="card-text"> Categoria: ' + result[1] + '</p>' +
        '    <p class="card-text"> Descrição: ' + result[2] + '</p>' +
        '    <p class="card-text"> Peso: ' + result[3] + '</p>' +
        '  </div>' +
        '</div>' +
        '<div style="text-align: center;"><i class="fa fa-angle-double-down fa-2x"></i></div>';
      $('#producer').append(card);
    } else {
      console.log("else");
      console.log('error => ', error);
    }
  });

  globContract.getManufacturerById(_chainId, function (error, result) {
    if (!error) {
      var card =
        '<div class="card">' +
        '  <div class="card-body">' +
        '    <p class="card-text"> Novo Produto: ' + result[0] + '</p>' +
        '    <p class="card-text"> Validade: ' + result[1] + '</p>' +
        '    <p class="card-text"> Tipo de Embalagem: ' + result[2] + '</p>' +
        '  </div>' +
        '</div>' +
        '<div style="text-align: center;"><i class="fa fa-angle-double-down fa-2x"></i></div>';
      $('#manufacturer').append(card);
    } else {
      console.log("else");
      console.log('error => ', error);
    }
  });

  globContract.getDistributorById(_chainId, function (error, result) {
    if (!error) {
      var card =
        '<div class="card">' +
        '  <div class="card-body">' +
        '    <p class="card-text"> Recipiente: ' + result[0] + '</p>' +
        '    <p class="card-text"> Data Estimada De Entrega: ' + result[1] + '</p>' +
        '    <p class="card-text"> Temperatura do Local: ' + result[2] + '</p>' +
        '  </div>' +
        '</div>' +
        '<div style="text-align: center;"><i class="fa fa-angle-double-down fa-2x"></i></div>';
      $('#distributor').append(card);
    } else {
      console.log("else");
      console.log('error => ', error);
    }
  });

  globContract.getDealerById(_chainId, function (error, result) {
    if (!error) {
      var card =
        '<div class="card">' +
        '  <div class="card-body">' +
        '    <p class="card-text"> Revendedor: ' + result[0] + '</p>' +
        '    <p class="card-text"> Local Armazenamento: ' + result[1] + '</p>' +
        '    <p class="card-text"> Temperatura do Local: ' + result[2] + '</p>' +
        '  </div>' +
        '</div>';
      $('#dealer').append(card);
    } else {
      console.log("else");
      console.log('error => ', error);
    }
  });
});