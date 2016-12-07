contract LetterOfCredit{
    uint public lcStatus;
    bytes32 public lcHash;
    bytes32 public bolHash1;
    bytes32 public bolHash2;
    address public buyerAddress;
    address public sellerAddress;
    address public shippingAgentAddress;
    uint public assetValue;

    event CustomLog(string str);

    function issueLCRequest(){
        lcStatus =1;
        CustomLog("issueLCRequest");
    }

    function issueLC(string _hash){
        lcStatus=2;
        lcHash=sha3(_hash);
        CustomLog("issueLC");
    }
    function verifyLC(){
        lcStatus =3;
        CustomLog("verifyLC");
    }

    function dispatchGoods(address _seller){
        lcStatus =4;
	sellerAddress=_seller;
        CustomLog("dispatchGoods");
    }
    function uploadBOL(string _hash){
        lcStatus =5;
        bolHash1=sha3(_hash);
        CustomLog("Upload BOL and Digitally Sign");
    }
    function transportGoods(){
        lcStatus =6;
        CustomLog("transportGoods");
    }
    function goodsDelivered(address _shippingAgent){
        lcStatus =7;
	shippingAgentAddress=_shippingAgent;
        CustomLog("goodsDelivered");
    }
    function goodsReceived(uint _assetValue){
        lcStatus =8;
        assetValue = 1000000000000000000*_assetValue;
        CustomLog("goodsReceived");
    }
    function confirmPayment(){
        lcStatus =9;
        CustomLog("confirmPayment");
    }
    function makePayment(){
        lcStatus =10;
        if (!sellerAddress.send(assetValue-(3 ether)))
           throw;
        if(!shippingAgentAddress.send(3 ether))throw;
        CustomLog("makePayment");
    }

    function clearContract(){
        lcStatus=0;
        lcHash=0;
        bolHash1=0;
        bolHash2=0;
        buyerAddress=0;
        sellerAddress=0;
        shippingAgentAddress=0;
        assetValue=0;
        CustomLog("cleared Contract");
    }

    function compareHash(){

		if(equal(bolHash1,bolHash2)){
			CustomLog("The bill of lading is same");
		}
		else{
			CustomLog("The bill of lading is altered");
		}

	}

	function compare(bytes32 a, bytes32 b) returns (int) {

        	uint minLength = a.length;
       		if (b.length < minLength) minLength = b.length;
        		//@todo unroll the loop into increments of 32 and do full 32 byte comparisons
        	for (uint i = 0; i < minLength; i ++)
          	 if (a[i] < b[i])
            	   return -1;
           	else if (a[i] > b[i])
           	    return 1;
        	if (a.length < b.length)
         	  return -1;
       		else if (a.length > b.length)
           	return 1;
        	else
           	return 0;
    	}
	function equal(bytes32 _a, bytes32 _b) returns (bool) {
        return compare(_a, _b) == 0;
    	}

}
