import React, { Component } from "react";
import tetherImg from "../tether.png";
import Web3 from "web3";

class Main extends Component {
  render() {
    return (
      <div id="content" className="mt-3">
        <table className="table text-muted text-center">
          <thead>
            <tr style={{ color: "black" }}>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody style={{ color: "black" }}>
            <tr>
              <td>
                {Web3.utils.fromWei(
                  this.props.stakingBalance.toString(),
                  "Ether"
                )}{" "}
                USDT
              </td>
              <td>
                {Web3.utils.fromWei(
                  this.props.rewardBalance.toString(),
                  "Ether"
                )}
                Reward
              </td>
            </tr>
          </tbody>
        </table>
        <div className="card mb-2" style={{ opacity: "0.9" }}>
          <form
            className="mb-3"
            onSubmit={(e) => {
              e.preventDefault();
              let amount = this.input.value.toString();
              amount = Web3.utils.toWei(amount, "Ether");
              this.props.stakeTokens(amount);
            }}
          >
            <div style={{ borderSpacing: "0 1em" }}>
              <label
                className="float-left"
                style={{ marginLeft: "15px", fontWeight: "bold" }}
              >
                Stake Tokens
              </label>
              <span className="float-right" style={{ marginRight: "8px" }}>
                Balance:{" "}
                {Web3.utils.fromWei(
                  this.props.tetherBalance.toString(),
                  "Ether"
                )}
              </span>
              <div className="input-group mb-4">
                <input
                  type="text"
                  placeholder="0"
                  required
                  ref={(input) => {
                    this.input = input;
                  }}
                />
                <div className="input-group-open">
                  <div className="inout-group-text">
                    <img
                      src={tetherImg}
                      alt="tether icon"
                      height="32"
                      style={{ marginRight: "6px" }}
                    />
                    USDT
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Deposit
              </button>
            </div>
          </form>
          <button
            type="submit"
            className="btn btn-secondary btn-lg btn-block"
            onClick={(event) => {
              event.preventDefault(this.props.unstakeTokens());
            }}
          >
            Withdraw
          </button>
          <div className="card-body text-center" style={{ color: "blue" }}>
            Air Drop
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
