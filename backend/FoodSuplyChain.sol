pragma solidity ^0.4.18;

contract FoodSuplyChain {

  struct Producer {
    uint id;
    address seller;
    string name;
    string category;
    string description;
    string weight;
  }

  struct Manufacturer {
    uint id;
    address seller;
    string product;
    string shelfLife;
    string packageType;
  }

  struct Distributor {
    uint id;
    address seller;
    string recipient;
    string estimatedReceivingDate;
    string transportType;
  }

  struct Dealer {
    uint id;
    address seller;
    string resellerName;
    string storageLocation;
    string temperature;
  }

  mapping (uint => Producer) public producers;
  mapping (uint => Manufacturer) public manufacturers;
  mapping (uint => Distributor) public distributors;
  mapping (uint => Dealer) public dealers;

  uint chains;

  function setProducer(uint _id, string _name, string _category, string _description, string _weight) payable public  {
    chains++;

    producers[_id] = Producer(
      _id,
      msg.sender,
      _name,
      _category,
      _description,
      _weight
    );
  }

  function setManufacturer(uint _id, string _product, string _shelfLife, string _packageType) payable public  {

    manufacturers[_id] = Manufacturer(
      _id,
      msg.sender,
      _product,
      _shelfLife,
      _packageType
    );
  }

  function setDistributor(uint _id, string _recipient, string _estimatedReceivingDate, string _transportType) payable public  {

    distributors[_id] = Distributor(
      _id,
      msg.sender,
      _recipient,
      _estimatedReceivingDate,
      _transportType
    );
  }

  function setDealer(uint _id, string _resellerName, string _storageLocation, string _temperature) payable public  {

    dealers[_id] = Dealer(
      _id,
      msg.sender,
      _resellerName,
      _storageLocation,
      _temperature
    );
  }

  //retorna os produtores armazenados
  function getProducersChains() public view returns (uint[]) {
    uint[] memory chainsIds = new uint[](chains);

    uint numberOfinitializedChains = 0;
    for(uint i = 1; i <= chains; i++) {
        chainsIds[numberOfinitializedChains] = producers[i].id;
        numberOfinitializedChains++;
    }

    //copia para array de itens
    uint[] memory registries = new uint[](numberOfinitializedChains);
    for(uint j = 0; j < numberOfinitializedChains; j++) {
      registries[j] = chainsIds[j];
    }

    return registries;
  }

  function getProducerById(uint _id) public view returns (string, string, string, string) {
    Producer storage producer = producers[_id];
    return (producer.name, producer.category, producer.description, producer.weight);
  }

  function getManufacturerById(uint _id) public view returns (string, string, string) {
    Manufacturer storage manufacturer = manufacturers[_id];
    return (manufacturer.product, manufacturer.shelfLife, manufacturer.packageType);
  }

  function getDistributorById(uint _id) public view returns (string, string, string) {
    Distributor storage distributor = distributors[_id];
    return (distributor.recipient, distributor.estimatedReceivingDate, distributor.transportType);
  }

  function getDealerById(uint _id) public view returns (string, string, string) {
    Dealer storage dealer = dealers[_id];
    return (dealer.resellerName, dealer.storageLocation, dealer.temperature);
  }
}