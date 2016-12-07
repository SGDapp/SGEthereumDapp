'use strict';

// For geth
if (typeof dapple === 'undefined') {
  var dapple = {};
}

if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
  var Web3 = require('web3');
}

dapple['contracts'] = (function builder () {
  var environments = {};

  function ContractWrapper (headers, _web3) {
    if (!_web3) {
      throw new Error('Must supply a Web3 connection!');
    }

    this.headers = headers;
    this._class = _web3.eth.contract(headers.interface);
  }

  ContractWrapper.prototype.deploy = function () {
    var args = new Array(arguments);
    args[args.length - 1].data = this.headers.bytecode;
    return this._class.new.apply(this._class, args);
  };

  var passthroughs = ['at', 'new'];
  for (var i = 0; i < passthroughs.length; i += 1) {
    ContractWrapper.prototype[passthroughs[i]] = (function (passthrough) {
      return function () {
        return this._class[passthrough].apply(this._class, arguments);
      };
    })(passthroughs[i]);
  }

  function constructor (_web3, env) {
    if (!env) {
      env = {};
    }
    while (typeof env !== 'object') {
      if (!(env in environments)) {
        throw new Error('Cannot resolve environment name: ' + env);
      }
      env = environments[env];
    }

    if (typeof _web3 === 'undefined') {
      if (!env.rpcURL) {
        throw new Error('Need either a Web3 instance or an RPC URL!');
      }
      _web3 = new Web3(new Web3.providers.HttpProvider(env.rpcURL));
    }

    this.headers = {
      'LetterOfCredit': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': '_seller',
                'type': 'address'
              }
            ],
            'name': 'dispatchGoods',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'lcHash',
            'outputs': [
              {
                'name': '',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'a',
                'type': 'bytes32'
              },
              {
                'name': 'b',
                'type': 'bytes32'
              }
            ],
            'name': 'compare',
            'outputs': [
              {
                'name': '',
                'type': 'int256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'bolHash2',
            'outputs': [
              {
                'name': '',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'sellerAddress',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'bolHash1',
            'outputs': [
              {
                'name': '',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'buyerAddress',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'clearContract',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_hash',
                'type': 'string'
              }
            ],
            'name': 'issueLC',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'confirmPayment',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_shippingAgent',
                'type': 'address'
              }
            ],
            'name': 'goodsDelivered',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'issueLCRequest',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'lcStatus',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_assetValue',
                'type': 'uint256'
              }
            ],
            'name': 'goodsReceived',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'shippingAgentAddress',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'assetValue',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'transportGoods',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'makePayment',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_a',
                'type': 'bytes32'
              },
              {
                'name': '_b',
                'type': 'bytes32'
              }
            ],
            'name': 'equal',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'verifyLC',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'compareHash',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_hash',
                'type': 'string'
              }
            ],
            'name': 'uploadBOL',
            'outputs': [],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'str',
                'type': 'string'
              }
            ],
            'name': 'CustomLog',
            'type': 'event'
          }
        ],
        'bytecode': '6060604052610fea806100126000396000f360606040523615610124576000357c0100000000000000000000000000000000000000000000000000000000900480630cbe0635146101265780631b7c728c1461013e57806328602ab2146101655780632f68f7811461019a5780633d9b2ae6146101c15780634330c289146101fa57806344834aca146102215780634b307f801461025a5780634eb799141461026957806362ef1f81146102bf578063701cfeba146102ce578063853b1db0146102e657806387100124146102f55780639d06e89f146103185780639da2151914610330578063a71891c314610369578063d76d9ba91461038c578063d8d797001461039b578063df6ea8cf146103aa578063e0309a98146103e1578063e679ebd9146103f0578063f9c7e5fc146103ff57610124565b005b61013c6004808035906020019091905050610455565b005b61014b60048050506104fa565b604051808260001916815260200191505060405180910390f35b6101846004808035906020019091908035906020019091905050610503565b6040518082815260200191505060405180910390f35b6101a7600480505061073d565b604051808260001916815260200191505060405180910390f35b6101ce6004805050610746565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610207600480505061076c565b604051808260001916815260200191505060405180910390f35b61022e6004805050610775565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610267600480505061079b565b005b6102bd6004808035906020019082018035906020019191908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509090919050506108cd565b005b6102cc6004805050610983565b005b6102e460048080359060200190919050506109fc565b005b6102f36004805050610aa1565b005b6103026004805050610b1a565b6040518082815260200191505060405180910390f35b61032e6004808035906020019091905050610b23565b005b61033d6004805050610bb1565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6103766004805050610bd7565b6040518082815260200191505060405180910390f35b6103996004805050610be0565b005b6103a86004805050610c59565b005b6103c96004808035906020019091908035906020019091905050610da7565b60405180821515815260200191505060405180910390f35b6103ee6004805050610dc3565b005b6103fd6004805050610e3c565b005b6104536004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050610f34565b005b600460006000508190555080600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055507f9a44889d27dca71b3b6a5f29d89b9086640558f73d6ae701509443e9f252762b60405180806020018281038252600d8152602001807f6469737061746368476f6f64730000000000000000000000000000000000000081526020015060200191505060405180910390a15b50565b60016000505481565b6000600060008450602060ff169150818450602060ff16101561052c578350602060ff16915081505b600090505b818110156106c95783816020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191685826020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916101561060b577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9250610735566106bb565b83816020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191685826020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191611156106ba5760019250610735565b5b5b8080600101915050610531565b8350602060ff168550602060ff161015610709577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff925061073556610734565b8350602060ff168550602060ff16111561072a576001925061073556610733565b60009250610735565b5b5b505092915050565b60036000505481565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60026000505481565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006000600050819055506000600102600160005081905550600060010260026000508190555060006001026003600050819055506000600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506000600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506000600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555060006007600050819055507f9a44889d27dca71b3b6a5f29d89b9086640558f73d6ae701509443e9f252762b6040518080602001828103825260108152602001807f636c656172656420436f6e74726163740000000000000000000000000000000081526020015060200191505060405180910390a15b565b600260006000508190555080604051808280519060200190808383829060006004602084601f0104600302600f01f15090500191505060405180910390206001600050819055507f9a44889d27dca71b3b6a5f29d89b9086640558f73d6ae701509443e9f252762b6040518080602001828103825260078152602001807f69737375654c430000000000000000000000000000000000000000000000000081526020015060200191505060405180910390a15b50565b60096000600050819055507f9a44889d27dca71b3b6a5f29d89b9086640558f73d6ae701509443e9f252762b60405180806020018281038252600e8152602001807f636f6e6669726d5061796d656e7400000000000000000000000000000000000081526020015060200191505060405180910390a15b565b600760006000508190555080600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055507f9a44889d27dca71b3b6a5f29d89b9086640558f73d6ae701509443e9f252762b60405180806020018281038252600e8152602001807f676f6f647344656c69766572656400000000000000000000000000000000000081526020015060200191505060405180910390a15b50565b60016000600050819055507f9a44889d27dca71b3b6a5f29d89b9086640558f73d6ae701509443e9f252762b60405180806020018281038252600e8152602001807f69737375654c435265717565737400000000000000000000000000000000000081526020015060200191505060405180910390a15b565b60006000505481565b600860006000508190555080670de0b6b3a7640000026007600050819055507f9a44889d27dca71b3b6a5f29d89b9086640558f73d6ae701509443e9f252762b60405180806020018281038252600d8152602001807f676f6f647352656365697665640000000000000000000000000000000000000081526020015060200191505060405180910390a15b50565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60076000505481565b60066000600050819055507f9a44889d27dca71b3b6a5f29d89b9086640558f73d6ae701509443e9f252762b60405180806020018281038252600e8152602001807f7472616e73706f7274476f6f647300000000000000000000000000000000000081526020015060200191505060405180910390a15b565b600a600060005081905550600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660006729a2241af62c000060076000505403604051809050600060405180830381858888f193505050501515610cd257610002565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660006729a2241af62c0000604051809050600060405180830381858888f193505050501515610d3957610002565b7f9a44889d27dca71b3b6a5f29d89b9086640558f73d6ae701509443e9f252762b60405180806020018281038252600b8152602001807f6d616b655061796d656e7400000000000000000000000000000000000000000081526020015060200191505060405180910390a15b565b60006000610db58484610503565b149050610dbd565b92915050565b60036000600050819055507f9a44889d27dca71b3b6a5f29d89b9086640558f73d6ae701509443e9f252762b6040518080602001828103825260088152602001807f7665726966794c4300000000000000000000000000000000000000000000000081526020015060200191505060405180910390a15b565b610e50600260005054600360005054610da7565b15610ec5577f9a44889d27dca71b3b6a5f29d89b9086640558f73d6ae701509443e9f252762b60405180806020018281038252601a8152602001807f5468652062696c6c206f66206c6164696e672069732073616d6500000000000081526020015060200191505060405180910390a1610f31565b7f9a44889d27dca71b3b6a5f29d89b9086640558f73d6ae701509443e9f252762b60405180806020018281038252601d8152602001807f5468652062696c6c206f66206c6164696e6720697320616c746572656400000081526020015060200191505060405180910390a15b5b565b600560006000508190555080604051808280519060200190808383829060006004602084601f0104600302600f01f15090500191505060405180910390206002600050819055507f9a44889d27dca71b3b6a5f29d89b9086640558f73d6ae701509443e9f252762b60405180806020018281038252601d8152602001807f55706c6f616420424f4c20616e64204469676974616c6c79205369676e00000081526020015060200191505060405180910390a15b5056'
      },
      'multisign': {
        'interface': [
          {
            'constant': true,
            'inputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'name': 'owners',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_owner1',
                'type': 'address'
              },
              {
                'name': '_owner2',
                'type': 'address'
              },
              {
                'name': '_owner3',
                'type': 'address'
              }
            ],
            'name': 'setOwners',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'to',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'name': 'accepted',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'clearAccepted',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'clearContract',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_toAddress',
                'type': 'address'
              }
            ],
            'name': 'sendAsset',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_required',
                'type': 'uint256'
              },
              {
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'setRequired',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'assetValue',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'yetNeeded',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'from',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_accepter',
                'type': 'address'
              }
            ],
            'name': 'approve',
            'outputs': [],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'str',
                'type': 'string'
              }
            ],
            'name': 'customLog',
            'type': 'event'
          }
        ],
        'bytecode': '6060604052610883806100126000396000f3606060405236156100b6576000357c010000000000000000000000000000000000000000000000000000000090048063025e7c27146100b85780630e802db4146100fa57806313151981146101245780632b34af701461015d578063458843581461018b5780634b307f801461019a57806397d2a36a146101a9578063a307c7f4146101c1578063a71891c3146101e2578063a8a924d414610205578063d5ce338914610228578063daea85c514610261576100b6565b005b6100ce6004808035906020019091905050610279565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61012260048080359060200190919080359060200190919080359060200190919050506102b3565b005b6101316004805050610370565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101736004808035906020019091905050610396565b60405180821515815260200191505060405180910390f35b61019860048050506103bb565b005b6101a760048050506104cc565b005b6101bf6004808035906020019091905050610532565b005b6101e060048080359060200190919080359060200190919050506105cf565b005b6101ef60048050506105f2565b6040518082815260200191505060405180910390f35b61021260048050506105fb565b6040518082815260200191505060405180910390f35b6102356004805050610604565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610277600480803590602001909190505061062a565b005b60056000508160038110156100025790900160005b9150909054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b826005600050600060038110156100025790900160005b6101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550816005600050600160038110156100025790900160005b6101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550806005600050600260038110156100025790900160005b6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b505050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060005060205280600052604060002060009150909054906101000a900460ff1681565b6000600090505b60056000505060038110156104c8576000600050600060056000508360038110156100025790900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16156104ba5760006000600050600060056000508460038110156100025790900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908302179055505b5b80600101905080506103c2565b5b50565b6000600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506000600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555060006004600050819055505b565b6001600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083021790555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b50565b8160036000508190555080670de0b6b3a7640000026004600050819055505b5050565b60046000505481565b60036000505481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b7f6aa9970194ba7ca7c34a365637f3cebed66b11dd9b6fd8222f178562954cec0f6040518080602001828103825260088152602001807f456e746572696e6700000000000000000000000000000000000000000000000081526020015060200191505060405180910390a1600060005060008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515610799577f6aa9970194ba7ca7c34a365637f3cebed66b11dd9b6fd8222f178562954cec0f60405180806020018281038252600f8152602001807f696e73696465206163636570746564000000000000000000000000000000000081526020015060200191505060405180910390a16003600081815054809291906001900391905055506001600060005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908302179055505b6000600360005054141561087f577f6aa9970194ba7ca7c34a365637f3cebed66b11dd9b6fd8222f178562954cec0f60405180806020018281038252600b8152602001807f7965744e6565646564203000000000000000000000000000000000000000000081526020015060200191505060405180910390a1600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166000600460005054604051809050600060405180830381858888f19350505050151561087657610002565b61087e6104cc565b5b5b5056'
      }
    };

    this.classes = {};
    for (var key in this.headers) {
      this.classes[key] = new ContractWrapper(this.headers[key], _web3);
    }

    this.objects = {};
    for (var i in env.objects) {
      var obj = env.objects[i];
      this.objects[i] = this.classes[obj['class']].at(obj.address);
    }
  }

  return {
    class: constructor,
    environments: environments
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = dapple['contracts'];
}
