contract multisign{

	mapping (address => bool) public accepted;
	address public from;
	address public to;
	uint public yetNeeded;
	uint public assetValue;
	address[3] public owners;

	event customLog(string str);
	function setRequired(uint _required, uint _value){

	    yetNeeded = _required;
	    assetValue = 1000000000000000000*_value;

	}

	function setOwners(address _owner1,address _owner2,address _owner3){
		owners[0]=_owner1;
		owners[1]=_owner2;
		owners[2]=_owner3;
	}

	function sendAsset(address _toAddress){
	    accepted[msg.sender]=true;
		from =msg.sender;
		to = _toAddress;

	}

	function approve(address _accepter){
        customLog("Entering");
		if(!accepted[_accepter]){
			customLog("inside accepted");
			yetNeeded--;
			accepted[_accepter] = true;
		}

		if(yetNeeded==0){
		    customLog("yetNeeded 0");
			if(!to.send(assetValue))throw;
			clearContract();
		}
	}

 	function clearContract(){
			from=0;
			to = 0;
			assetValue=0;
	}
	function clearAccepted(){

	    for (uint i = 0; i < owners.length; ++i)
        		{
				if(accepted[owners[i]])accepted[owners[i]]=false;
			}

	}


}
