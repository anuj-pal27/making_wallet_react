import { useState, useEffect } from "react";

export const ShowWallet = ({ addresses, leftWallet, walletIndex }) => {

  
  let text=""
  let textArr=[]
  const [textArray, setTextArray] = useState([])
  
  useEffect(() => {
    for (let i = 0; i < [...addresses].length; i++) {
      if(text.length < 28) {
       text += addresses[i]
      }else {
        textArr.push(text)
        setTextArray([...textArr])
        text = "";
      }
    }
    textArr.push(text)
    setTextArray([...textArr])
    console.log(textArr)
  }, [addresses])
  

  function deleteHandler() {
    leftWallet(walletIndex);
  }
  return (
    <>
      <div className="border-2 border-dashed rounded-lg border-gray-500 relative my-4">
        <div className="flex justify-between items-center">
          <div className="m-4 flex flex-col gap-4">
            <div className="text-xl text-white font-semibold">
              Solana Wallet {walletIndex + 1}
            </div>
            <div className="text-lg font-normal text-slate-400 ">
              Public Key
            </div>
          </div>
          <button
            className="bg-red-700 rounded-xl px-6 py-4 mr-4 text-lg text-center text-blue-200"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>

        <div className="text-xl border-3 border-solid border-gray-900 text-blue-200 bg-slate-900 rounded-xl p-3 md:flex">
          {/* {addresses} */}
          {textArray.map((address, index) => (
            <div key={index}> {address} </div>
          ))}
        </div>
      </div>
    </>
  );
};
