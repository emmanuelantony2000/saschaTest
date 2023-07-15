// const { ethers } = require("ethers");
const axios = require("axios");
require("dotenv").config();
const { ethers } = require('hardhat');

//create provider from JSON RPC URL
async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const repeatLoop = async () => {
        // run the loop for 5 times
        for (let i = 0; i < 5; i++) {
            const response = await axios.post(process.env.RPC_URL, { method: "net_version", params: [], id: 1, "params": [], "id": 67, "jsonrpc": "2.0" });
            console.log(response.data);
            const network_details = await provider.getNetwork();
            console.log(network_details.chainId);
        }
    }
    

    // create a random wallet
    const wallet = ethers.Wallet.createRandom();
    const walletAddress = wallet.address;
    console.log(walletAddress);

    // faucet
    await repeatLoop();
    await axios.post(process.env.RPC_URL, {
        method: "buildbear_nativeFaucet", params: [], id: 2, "params": [
            {
                "address": walletAddress,
                "balance": "987"
            }
        ], "jsonrpc": "2.0"
    });
    
    // deploying erc20 
    const erc20Factory = await ethers.getContractFactory("Token");
    const walletwithProvider = wallet.connect(provider);
    // connecting the erc20 contract to the provider
    const erc20 = await erc20Factory.connect(walletwithProvider);
    // deploying the erc20 contract
    await repeatLoop();
    const erc20Contract = await erc20.deploy(ethers.utils.parseEther("1000000"));
    await repeatLoop();
    console.log(erc20Contract.address);

    // wrapping Native Token
    const wNativeABI = [
        "function deposit() payable",
        "function withdraw(uint256 amount)"
    ]
    const WBNB_ADDRESS = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    const WMATIC_ADDRESS = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"
    const wNativeInstance = await ethers.getContractAt(wNativeABI, WBNB_ADDRESS);
    

    // depositing native token
    await repeatLoop();
    const depositTx = await wNativeInstance.connect(walletwithProvider).deposit({ value: ethers.utils.parseEther("1") });

    // transfering 1 token to some random address  
    await repeatLoop();
    const transferTx = await erc20Contract.connect(walletwithProvider).transfer(WMATIC_ADDRESS, ethers.utils.parseEther("1"));

    // withdrawing native token
    await repeatLoop();
    const withdrawTx = await wNativeInstance.connect(walletwithProvider).withdraw(ethers.utils.parseEther("0.5"));

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


