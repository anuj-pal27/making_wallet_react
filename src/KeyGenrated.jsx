import { HDNodeWallet, Wallet } from "ethers";
import React, { useState } from "react";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { ShowWallet } from "./ShowWallet";
import Button from '@mui/material/Button';
// import { KeyGenrated } from './KeyGenrated'
export const KeyGenrated = () => {
  const [mnemonic,setMnemonic] = useState(generateMnemonic());
  const [component,setComponent] = useState(false);
  let [seedPhrase, setSeedPhrase] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);
function generateSeedPhrase(){
  setComponent(true);
  setMnemonic(generateMnemonic());
  setSeedPhrase(mnemonic);
  deletewalletHandler();
}
  const remaningWallet = (indexToDelete) => {
    let remaingwallet = addresses.filter((_, index) => index != indexToDelete);
    setAddresses(remaingwallet);
  };
  function deletewalletHandler() {
    console.log("lenght of addresses", currentIndex);
    while (addresses.length) {
      addresses.pop();
    }
    remaningWallet(currentIndex);
    setCurrentIndex(0);
  }
  return (
    <div>
      <div className="flex flex-col border-2 border-solid border-slate-500 rounded-lg bg-slate-800 ">
        <div className="bg-slate-900 p-6 ">
          <p className="text-[30px] font-bold">Solana web wallet</p>
        </div>
        <Button variant="contained" onClick={generateSeedPhrase} size="large">
          <p className="p-3 font-bold text-lg">Generate new Mnemonic</p>
        </Button>
      </div>
        {component?
      <div>
      <div className=" flex flex-col mt-5">
        <div className="flex flex-col ml-0 items-start ">
          <p className="flex flex-col text-2xl">Mnemonic Phrase</p>
        </div>
      </div>
      <div className="border-2 border-solid border-gray-600 rounded-xl p-3 mt-7 text-lg  flex  text-blue-200">
        {seedPhrase}
      </div>

      <button
        onClick={async function () {
          const seed = await mnemonicToSeed(mnemonic);
          console.log(seed);
          const derivationPath = `m/44'/60'/${currentIndex}'/0'`;

          const hdNode = HDNodeWallet.fromSeed(seed);
          console.log(hdNode);
          const child = hdNode.derivePath(derivationPath);
          const privateKey = child.privateKey;
          console.log(`private key - ${privateKey}`);
          const wallet = new Wallet(privateKey);
          console.log(`wallet ${wallet.address}`);
          setCurrentIndex(currentIndex + 1);
          setAddresses([...addresses, wallet.address]);
        }}
      >
        Add New Wallet ETH
      </button>
      <button onClick={deletewalletHandler}>Delete All Wallets</button>
      {addresses.map((p, index) => (
        <ShowWallet
          key={index}
          addresses={p}
          leftWallet={remaningWallet}
          walletIndex={index}
        />
      ))}
      {/* <button onClick={async function balanceHandler(){

      const response = await axios.post("https://eth-mainnet.g.alchemy.com/v2/m3_KI26guxU63CyIdr05QA19iMBoV_XX",
        {"jsonrpc":"2.0",
          "id":1,
          "method":"eth_getBalance",
          "params":[`${addresses.pop()}`,"latest"]
        }
      )
      console.log(response.data.result)
      setNewresponse(response.data);
    }}>Show Balance</button> */}

      {/* <div>
      {newresponse}
    </div>
     */}</div>:""}
    </div>
  );
};
