import React from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import ConnectButton from '../views/Home/components/ConnectButton'
import Button from './Button'
import { MAIN_SITE } from '../config'


export default function Menu() {
  const { account } = useWallet()

  const guideHandler = ()=>{
    window.open("https://docs.moonshield.finance/")
  }
  return (
    <>
      <div className="flex flex-wrap shadow-xl fixed w-full z-50 bg-purple-1000">
        <div className="w-full max-w-screen-lg mx-auto">
          <nav className="relative flex flex-wrap items-center justify-between px-2 py-2">
            <div className="container px-4 mx-auto flex flex-wrap justify-between w-full">
              <div>
                <img src="/images/logo.png" alt="logo" className="h-14 inline align-middle"/>
                <span className="hidden md:inline-block text-lg font-bold leading-relaxed ml-4 whitespace-nowrap uppercase tracking-widest">
                  <span className="text-white font-sans">Moon</span><span className="text-yellow-500 font-sans">Shield</span>
                </span>
              </div>
              <ul className="flex flex-row list-none ml-auto mt-3">
                <li className="nav-item">
                  <Button type="button">
                    <a href={MAIN_SITE}>Main Site</a>
                  </Button>
                </li>
                <li className="nav-item ml-2">
                  <Button type="button" onClick={guideHandler}>
                    Guide
                  </Button>
                </li>
                <li className="nav-item ml-2">
                  <ConnectButton account = {account} />
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}