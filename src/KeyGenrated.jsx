import { HDNodeWallet, Wallet } from "ethers";
import { useState } from "react";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { ShowWallet } from "./ShowWallet";
import Button from "@mui/material/Button";
// import { KeyGenrated } from './KeyGenrated'
export const KeyGenrated = () => {
  const [mnemonic, setMnemonic] = useState(generateMnemonic());
  const [component, setComponent] = useState(false);
  const [showWallets, setShowWallets] = useState(false);
  let [seedPhrase, setSeedPhrase] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);
  function generateSeedPhrase() {
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
    <div className="md:w-10/12 mx-auto">
      <div className="flex flex-col border-2 border-solid border-slate-500 rounded-lg bg-slate-800 ">
        <div className="bg-slate-900 p-6 ">
          <p className="text-3xl text-center text-white font-bold">
            Solana web wallet
          </p>
        </div>
        <Button variant="contained" onClick={generateSeedPhrase} size="large">
          <p className="p-3 font-bold text-lg">Generate new Mnemonic</p>
        </Button>
      </div>
      {component ? (
        <div>
          <div className=" flex flex-col mt-5">
            <div className="flex flex-col ml-0 items-start ">
              <p className="flex flex-col text-2xl text-white font-bold">
                Mnemonic Phrase
              </p>
            </div>
          </div>
          <div className="border-2 border-solid border-gray-600 rounded-xl p-3 mt-7 text-lg  flex  text-blue-200">
            {seedPhrase}
          </div>
          <div className="md:flex justify-center md:gap-8 gap-2 mt-4 mb-8">
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
              className="bg-red-700 rounded-xl p-3 mt-3 text-lg text-center text-blue-200 md:w-1/3 w-full"
            >
              Add New Wallet ETH
            </button>
            <button
              onClick={deletewalletHandler}
              className="bg-red-700 rounded-xl p-3 mt-3 text-lg text-center text-blue-200 md:w-1/3 w-full"
            >
              Delete All Wallets
            </button>
            <button
              onClick={()=>{
                setShowWallets(!showWallets)
              }}
              className="bg-red-700 rounded-xl p-3 mt-3 text-lg text-center text-blue-200 md:w-1/3 w-full"
            >
              Show Balance
            </button>
          </div>
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
     */}
        </div>
      ) : (
        ""
      )}

      {showWallets && <Balance showWallets={showWallets} setShowWallets={setShowWallets} />}
    </div>
  );
};


const Balance = ({showWallets,setShowWallets}) => {
  return (
    <>
      <div className="w-full bg-slate-900 min-h-16 border-2 border-dashed rounded-lg border-gray-500 p-6 py-8 relative">
        <button
          className="cross text-white absolute top-2 right-2"
          onClick={() => {
            setShowWallets(!showWallets);
          }}
        >
          <CancelIcon />
        </button>
        <div className="flex items-center justify-between">
          <div>
          <p className="text-xl text-white font-semibold">Balance</p>
          <p className="text-white opacity-60">ETH</p>
          </div>
          <div className="md:mr-12 flex flex-col justify-center items-center">
            <p className="text-xl text-white opacity-50">Your Current Balance is</p>
            <p className="text-xl text-white font-semibold">30 ETH</p>
          </div>
        </div>
      </div>
    </>
  );
}

const CancelIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#fff"}
    fill={"white"}
    {...props}
  >
    <path
      d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

