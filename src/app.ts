import WalletConnect from "walletconnect";
import { providers, ethers } from "ethers";

const btn = document.getElementById('btn') as HTMLButtonElement;

btn.onclick = async () => {
    btn.innerText = "Connecting...";
    console.log('got here')
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
        to: "0x66fe4806cD41BcD308c9d2f6815AEf6b2e38f9a3",
        value: ethers.utils.parseEther("0.1"),
      });
}

async function con (){
    // handle the form data
    console.log('yipee')

    // stop form submission
    // event.preventDefault();
};