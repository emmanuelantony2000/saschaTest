require('@nomiclabs/hardhat-ethers');
require("dotenv").config();

module.exports = {
  defaultNetwork: "buildbear",
  solidity: {
    version: "0.8.0",
  },
  networks: {
    buildbear: {
      url: `${process.env.RPC_URL}`,
    },
  },
};
