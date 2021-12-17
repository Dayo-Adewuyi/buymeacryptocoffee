import WalletConnect from "walletconnect";
import { providers, ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

const btn = document.getElementById('btn') as HTMLButtonElement;
let address = document.getElementById('daddress') as HTMLInputElement;
let addressVal = address.value;
let amount = document.getElementById('damount') as HTMLInputElement;
let amountVal = amount.value;

(window as any).getAccount = async () => {
	const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' })

	const account = await accounts[0];
    let weiAmount = ethers.utils.parseEther(amountVal);
    console.log(weiAmount)
	
	await (window as any).ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: addressVal,
          value: weiAmount._hex,
        },
      ],
    })
    .then((txHash: any) => console.log(txHash))
    .catch((error: any) => {
        console.error;
        let errorMessage = document.getElementById('error-message') as HTMLParagraphElement;
        errorMessage.innerHTML = error.message;
    });
}

btn.onclick = async () => {
    const ethereumProvider = await detectEthereumProvider();

    if (ethereumProvider) {
        await (window as any).getAccount();
    } else {
        //  Create WalletConnect SDK instance
        const wc = new WalletConnect();

        //  Connect session (triggers QR Code modal)
        const connector = await wc.connect();

        //  Get your desired provider

        const provider = await wc.getWeb3Provider({
            infuraId: "e93d42bc84a24d3eac4cd187495f0adf",
            qrcodeModalOptions: {
                mobileLinks: [
                "rainbow",
                "metamask",
                "argent",
                "trust",
                "imtoken",
                "pillar",
                ],
            },
        });

        const account = await provider.enable();

        //  Wrap with Web3Provider from ethers.js
        const web3Provider = new providers.Web3Provider(provider);
        
        
        const signer = web3Provider.getSigner();
        await signer.sendTransaction({
            to: addressVal,
            value: ethers.utils.parseEther(amountVal),
        })
        .then((txHash: any) => console.log(txHash))
        .catch((error: any) => {
            console.error;
            let errorMessage = document.getElementById('error-message') as HTMLParagraphElement;
            errorMessage.innerHTML = error.message;
        });
    }
}
