

(() => {
    if($) {
        $(document).ready(init);        
    }

    function init() {
        
        if(typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            alert('You have to install MetaMask plugin!');
        }

        wireBuyButton();
        //wireSubscriptions();
    }

    function wireBuyButton() {
        $("#buy-tokens-action").click(() => {
            const contractAddress = '0xCD866c41e2Ea3EcE128b3Da262A22027c37ea1fb';

            web3.eth.sendTransaction(
                {
                    to: contractAddress,
                    from: web3.eth.accounts[0],
                    value: web3.toWei($('#inputEthers').val(), "ether")
                },
                function (error) {
                    console.log(error);
                }
            );
        });
    }

    /*function wireSubscriptions() {
        const tokenAddress = '0xE8cfEeF8858322FA4b8257994fB111CB227860C9'; 
        let subscription = web3.eth.subscribe('sent', {
            address: tokenAddress
        }, function(error, result) {
            if(!error) {
                debugger
                console.log(log);
            } else {
                alert(error);
                debugger;
            }
        });
    }*/
})();