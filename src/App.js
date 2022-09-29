import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Web3 from "web3";
import Tether from "./truffle_abis/Tether.json";
import Reward from "./truffle_abis/Reward.json";
import DecentralBank from "./truffle_abis/DecentralBank.json";
import detectEthereumProvider from "@metamask/detect-provider";

function App() {
  const [web3Api, setWeb3Api] = useState({ provider: null, web3: null });
  const [account, setAccount] = useState("0x0");

  const [tetherContract, setTetherContract] = useState({});
  const [tetherBalance, setTetherBalance] = useState(0);
  const [rewardContract, setRewardContract] = useState({});
  const [rewardBalance, setRewardBalance] = useState(0);

  console.log(tetherBalance);

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        provider.request({ method: "eth_requestAccounts" });
        setWeb3Api({
          web3: new Web3(provider),
          provider,
        });
      } else {
        console.error("please, install Metamask.");
      }
    };
    loadProvider();
  }, []);

  useEffect(() => {
    const getBlockchainData = async () => {
      // get the account from our blockchain data
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
      // set up network ID that we can connect to Tether contract
      const networkId = await web3Api.web3.eth.net.getId();
      console.log(networkId);
      // load Tether Contract
      console.log(DecentralBank);

      const tetherData = Tether.networks[networkId];
      if (tetherData) {
        const tetherContract = new web3Api.web3.eth.Contract(
          Tether.abi,
          tetherData.address
        );
        // load Tether balance
        let tetherBalance = await tetherContract.methods
          .balanceOf(account)
          .call();
        setTetherBalance(tetherBalance.toString());
      } else {
        //if we dont load tether Data
        alert(
          "Error! Tether contract data not available. Consider changing to the Ganache network."
        );
      }

      // load Reward Contract
      const rewardData = Reward.networks[networkId];
      console.log(rewardData);
      if (rewardData) {
        const rewardContract = new web3Api.web3.eth.Contract(
          Reward.abi,
          rewardData.address
        );

        // load reward balance
        let rewardBalance = await rewardContract.methods
          .balanceOf(account)
          .call();
        setRewardBalance(rewardBalance.toString());
      }
    };

    web3Api.web3 && getBlockchainData();
  }, [web3Api.web3, account]);

  return (
    <div className="App">
      <Navbar account={account} />
    </div>
  );
}

export default App;
