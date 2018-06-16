

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
            const contractAddress = '0x6BDeC446CaD3f3D308f317aC5DfAe2B1A28C2121';

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
        const tokenAddress = '0xfdE8F8AA7330Dd84Ce43E10EE990e3c962533c6F'; 
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