import WalletConnect from "walletconnect";
import { providers, ethers } from "ethers";

const btn = document.getElementById('btn') as HTMLButtonElement;
let address = document.getElementById('daddress') as HTMLInputElement;
let addressVal = address.value;
let amount = document.getElementById('damount') as HTMLInputElement;
let amountVal = amount.value;

btn.onclick = async () => {
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
      const tx = await signer.sendTransaction({
        to: addressVal,
        value: ethers.utils.parseEther(amountVal),
      });
}
