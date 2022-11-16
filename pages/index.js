import styles from '../styles/Home.module.css'
import Web3 from 'web3'
import { useEffect, useState } from 'react'
const provider = "https://bsc-dataseed.binance.org/"
const web3 = new Web3(provider)

export default function Home() {

  const [wallets,setWallets] = useState([])
  
  /*useEffect(()=>{
    init()
  },[])*/

  const init =  ()=>{
    setInterval(async()=>{
      let walletData = web3.eth.accounts.create(web3.utils.randomHex(32))
      const address = walletData.address
      const balance = await web3.eth.getBalance(address)
      console.log("address: "+address)
      console.log("balance: "+balance)
      console.log(walletData)
      let data = {address,balance}
      let _wallets = wallets
      _wallets.push(data)
      setWallets(_wallets)
    },4000)
  }

  return (
    <div className={styles.container}>
        <button onClick={init}> Init </button>

        <div>
          {wallets.length > 0 && wallets.map((wallet,index)=>{
            return (<p key={index}>
              {wallet.address} - {wallet.balance}
            </p>)
          })}

        </div>
    </div>
  )
}
