import { useState, useEffect } from "react";
import "../App.css";
import Navbar from "./Navbar";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import Reward from "../truffle_abis/Reward.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";
import detectEthereumProvider from "@metamask/detect-provider";
import Main from "./Main";

function App() {
  const [web3Api, setWeb3Api] = useState({ provider: null, web3: null });
  const [account, setAccount] = useState("0x0");

  const [tetherContract, setTetherContract] = useState({});
  const [tetherBalance, setTetherBalance] = useState(0);
  const [rewardContract, setRewardContract] = useState({});
  const [rewardBalance, setRewardBalance] = useState(0);
  const [decentralBankContract, setDecentralBankContract] = useState({});
  const [stakingBalance, setStakingBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  //console.log(decentralBankContract);
  // console.log(tetherBalance, "tether Balance");
  // console.log(rewardBalance, "reward Balance");
  // console.log(stakingBalance, "staking Balance");

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

      // load Tether Contract
      const tetherData = Tether.networks[networkId];
      if (tetherData) {
        const tetherContract = new web3Api.web3.eth.Contract(
          Tether.abi,
          tetherData.address
        );
        setTetherContract(tetherContract);
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

      if (rewardData) {
        const rewardContract = new web3Api.web3.eth.Contract(
          Reward.abi,
          rewardData.address
        );
        setRewardContract(rewardContract);
        // load reward balance
        let rewardBalance = await rewardContract.methods
          .balanceOf(account)
          .call();
        setRewardBalance(rewardBalance.toString());
      } else {
        //if we dont load the reward Data
        alert(
          "Error! Reward contract data not available. Consider changing to the Ganache network."
        );
      }

      // load DecentralBank Contract
      const decentralBankData = DecentralBank.networks[networkId];

      if (decentralBankData) {
        const decentralBankContract = new web3Api.web3.eth.Contract(
          DecentralBank.abi,
          decentralBankData.address
        );
        console.log(decentralBankContract);
        setDecentralBankContract(decentralBankContract);
        // load DecentralBank balance
        let stakingBalance = await decentralBankContract.methods
          .stakingBalance(account)
          .call();
        setStakingBalance(stakingBalance.toString());
        setLoading(false);
      } else {
        //if we dont load the reward Data
        alert(
          "Error! Decental Bank contract data not available. Consider changing to the Ganache network."
        );
      }
    };

    web3Api.web3 && getBlockchainData();
  }, [web3Api.web3, account]);

  // staking function
  const stakeTokens = (amount) => {
    setLoading(true);
    tetherContract.methods
      .approve(decentralBankContract._address, amount)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        // grab decentralBank and then grab depositTokens()....send from the state of Account....
        decentralBankContract.methods
          .depositTokens(amount)
          .send({ from: account })
          .on("transactionHash", (hash) => {
            setLoading(false);
            window.location.reload();
          });
      });
  };

  //unstake function
  const unstakeTokens = () => {
    setLoading(true);
    decentralBankContract.methods
      .unstakeTokens()
      .send({ from: account })
      .on("transactionHash", (hash) => {
        setLoading(false);
        window.location.reload();
      });
  };

  return (
    <div className="App">
      <Navbar account={account} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "600px", minHeight: "100vm" }}
          >
            {loading ? (
              <p id="loader" className="text-center" style={{ margin: "30px" }}>
                Loading...
              </p>
            ) : (
              <Main
                tetherBalance={tetherBalance}
                rewardBalance={rewardBalance}
                stakingBalance={stakingBalance}
                stakeTokens={stakeTokens}
                unstakeTokens={unstakeTokens}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
