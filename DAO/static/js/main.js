

(() => {
    if($) {
        $(document).ready(init);        
    }

    function init() {
        
        if(typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
            //initLabels();
        } else {
            alert('You have to install MetaMask plugin!');
        }

        setBannerContent();
    }

    /*function initLabels() {
        let userAccount = web3.eth.accounts[0];

        if(userAccount) {
            const tokenAddress = '0xE8cfEeF8858322FA4b8257994fB111CB227860C9';

            let abi = [];
            let tokenContract = new web3.eth.contract(abi);
            let token = tokenContract.at(tokenAddress);
            
            let tokensAmount = token.getBalanceOf.getData(userAccount, (error, result) => {
                if(error) {
                    alert('error: ' + error);
                } else {
                    $('#current-motto').html(result);
                    console.log('OK: ' + result);
                }
            });

            
        }
    }*/

    function setBannerContent() {
        const contractAddress = "0x9bf321cdC814249Ca90073736275A808B159DB92";
        let abi = [ { "constant": true, "inputs": [], "name": "advBannerContent", "outputs": [ { "name": "", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "bannerRentPrice", "outputs": [ { "name": "", "type": "uint256", "value": "200000000000000000000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0xcc740a8a26a1b672b4977cb72e3387c6ecca4af3" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_price", "type": "uint256" } ], "name": "setPrice", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "lastParticipant", "outputs": [ { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_newBannerContent", "type": "string" } ], "name": "setBannerContent", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "token", "outputs": [ { "name": "", "type": "address", "value": "0xfde8f8aa7330dd84ce43e10ee990e3c962533c6f" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "_token", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_prevOwner", "type": "address" }, { "indexed": true, "name": "_newOwner", "type": "address" } ], "name": "OwnershipTransfered", "type": "event" } ];
        let dappContract = new web3.eth.contract(abi);
        let dapp = dappContract.at(contractAddress);
        
        $("#set-motto-action").click(() => {
            let userAccount = web3.eth.accounts[0];

            if(userAccount) {
                let motto = $('#bannerContent').val();

                if(motto) {
                    let functionData = dapp.setBannerContent.getData(motto);

                    web3.eth.sendTransaction({
                        to: contractAddress,
                        from: userAccount,
                        data: functionData
                    }, (error, result) => {
                        if(error) {
                            alert('error: ' + error);
                        } else {
                            $('h2.current-motto').html(motto);
                            console.log('OK: ' + result);
                        }
                    });
                }
            } else {
                alert("Can't find active MetaMask account.");
            }
        });
    }
})();