import React, { useCallback, useState } from 'react'
import Page from 'components/layout/Page'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useMaxBalance, useTokenBalance } from 'hooks/useTokenBalance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointer, faPaperPlane, faQuestionCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import addresses from 'config/constants/contracts'
import { useLPTotalLiquidity, useMoonBalance, useNextClaimDate, useTotalLiquidity, useLPBnbamount, useLPMshieldamount } from 'hooks/useSlotBalance'
import { useCollectBNB, useSendToken } from 'hooks/useMoonShield'
import TokenInput from 'components/TokenInput'
import { BUY_SMART_URL, DOC_ANTI_WHALES_URL, DOC_EARN_BNB_URL, WALLETS } from '../../config'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useGettingTime, usePriceBnbBusd } from '../../state/hooks'
import InfoItem from './components/InfoItem'
import { toLocaleString, toUTCString } from '../../utils/translateTextHelpers'

const Home: React.FC = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  const [val, setVal] = useState('')
  const [sendAddress, setAddressVal] = useState('')
  const [showShieldSwapMsg,setShowShieldSwapMsg] = useState(window.localStorage.getItem("showShieldSwapMsg") == null)
  const { account } = useWallet()
  const { onSend } = useSendToken()
  const [pendingTx, setPendingTx] = useState(false)
  const tokenAddress = addresses.moonShield[chainId]
  const { onCollect } = useCollectBNB()
  
  const tokenBalance = useTokenBalance(tokenAddress)
  let maxTrxBalance = useMaxBalance(tokenAddress)
  maxTrxBalance = maxTrxBalance.div(new BigNumber(1000000000))
  const fullBalance = tokenBalance.toNumber() === 0?'0':((tokenBalance.toNumber()/1000000000)).toLocaleString('en-US', {minimumFractionDigits: 3})
  const tokenName = 'Shield'

  const collectibleBNB = useMoonBalance(account);
  const BNBNum = collectibleBNB.toNumber()/1000000000000000000
  const formatedBNBNum = BNBNum === 0?'0':BNBNum.toLocaleString('en-US', {minimumFractionDigits: 8})

  const mynextclaimdate = useNextClaimDate(account)
  const nowdate = useGettingTime()
  const nextclaimdateGmt = mynextclaimdate.toNumber() === 0?"":toUTCString(new Date(mynextclaimdate.toNumber()*1000))
  const nextclaimdateLocale = mynextclaimdate.toNumber() === 0?"Not available":toLocaleString(new Date(mynextclaimdate.toNumber()*1000))

  const contracttotalliquidity = useTotalLiquidity();
  const totalliquidity = contracttotalliquidity.toNumber()
  const realtotalliquidity = totalliquidity === 0?'0':(totalliquidity/1000000000000000000).toLocaleString('en-US', {minimumFractionDigits: 3});

  const bnbPrice = usePriceBnbBusd();
  const totalvalue = bnbPrice.toNumber()
  const realvalue = totalvalue === 0?'0':(totalliquidity*totalvalue/1000000000000000000).toLocaleString('en-US', {minimumFractionDigits: 3});

  const contractlptotalliquidity = useLPBnbamount();
  const lptotalliquidity = contractlptotalliquidity.toNumber()
  const reallptotalliquidity = lptotalliquidity === 0?'0':(lptotalliquidity/1000000000000000000).toLocaleString('en-US', {minimumFractionDigits: 3});

  const reallpvalue = lptotalliquidity*totalvalue===0?'0':(lptotalliquidity*totalvalue/1000000000000000000).toLocaleString('en-US', {minimumFractionDigits: 3});

  const LpMshield = useLPMshieldamount();
  const LpMshieldValue = LpMshield.toNumber()
  const LpRatio = lptotalliquidity/LpMshieldValue
  const maxtransvalue = ((LpRatio*500000000000)/1000000000).toFixed(3);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleAddressChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setAddressVal(e.currentTarget.value)
    },
    [setAddressVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const handleBuyShield = ()=>{
    window.open(BUY_SMART_URL);
  }
  const renderWallets = () => {
    return WALLETS.map(wallet => {
      return <a className="block text-center" href={wallet.url}>{wallet.name}</a>
    })
  }
  return (
    <Page>
      <div className="pt-20">
        <div className="w-full max-w-screen-md mx-auto rounded-xl p-4 shadow-2xl-centered mt-2 border border-solid border-yellow-300">
          <div>
            <img src="/images/bnb.png" alt="bnb" className="h-24 mx-auto"/>
            <h1 className="text-2xl text-center font-bold">
              <span className="text-white font-sans">Moon</span>
              <span className="text-yellow-500 font-sans">Shield</span>
            </h1>
          </div>
          <div className="mx-auto text-xl text-center mt-1 text-white">
            A new way to earn BNB. 
          </div>
          <div className="text-center mt-6">
            <Button onClick={handleBuyShield} className="mx-auto">
              <FontAwesomeIcon icon={faShoppingCart} className="mr-1"/>
              Buy $Shield
            </Button>
          </div>
        </div>
        {!account?
          (
            <div className="w-full md:w-10/12 mx-auto p-4 shadow-2xl mt-10 rounded-xl divide-y-4 border-yellow-300 border border-solid">
              <div className="mt-8">
                <h1 className="text-3xl font-bold text-yellow-600 text-center">You are not connected or not using Binance Smart Chain network</h1>
              </div>
              <div className="text-center mt-5">
                <h2 className="text-2xl text-white">
                  To use the app, make sure:
                </h2>
                <h2 className="text-2xl text-yellow-600 w-full sm:max-w-xl mx-auto">
                  You are using the <b className="font-bold">Binance Smart Chain</b> network
                  You need to connect wallet to continue
                </h2>
              </div>
              <div className="text-center mt-5">
                <h2 className="text-2xl text-white">
                  Please switch to BSC Network if you use:
                </h2>
                <div className="text-2xl text-green-400 w-full sm:max-w-xl mx-auto">
                  {renderWallets()}
                </div>
              </div>
            </div>
          ):(
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-10 font-bold text-white">
                <InfoItem imgSrc="/images/max_trans.svg" label="Max transaction amount">
                  MSHLD 500000000000 | BNB {maxtransvalue}
                </InfoItem>
                <InfoItem imgSrc="/images/total_liquidity_pool.svg" label="Total liquidity pool">
                  $ {reallpvalue}
                </InfoItem>
                <InfoItem imgSrc="/images/1_mil_smart.svg" label="Total reward pool">
                  $ {realvalue}
                </InfoItem>
                <InfoItem imgSrc="/images/total_bnb_in_liquidity_pool.svg" label="Total BNB in liquidity pool">
                  BNB {reallptotalliquidity}
                </InfoItem>
                <InfoItem imgSrc="/images/bnb_reward.svg" label="Total BNB in reward pool">
                  BNB {realtotalliquidity}
                </InfoItem>
                <InfoItem imgSrc="/images/smart_balance.svg" label="Your SHIELD balance">
                  SHIELD {fullBalance}
                </InfoItem>
              </div>
              <div className="mt-28 text-sm">
                {/* {
                  showShieldSwapMsg && (
                  <div className="w-full bg-white font-bold px-10 py-16 rounded-5xl shadow-2xl">
                    <span>SMRAT swap is not available: You don&apos;t have any classic MRAT </span>
                    <Button className="ml-4" onClick={()=>{ window.localStorage.setItem("showShieldSwapMsg",""); setShowShieldSwapMsg(false) }}>Close</Button>
                  </div>
                  )
                } */}
                <div className="w-full px-10 py-8 rounded-xl shadow-2xl mt-10 border border-solid border-yellow-300 text-white">
                  <div>
                    My collectable BNB: <b className="ml-5">{formatedBNBNum} BNB</b>
                  </div>
                  <div>
                    <a href={DOC_EARN_BNB_URL} className="text-yellow-600 font-bold" target="_blank" rel="noreferrer">
                      *pool is always changing based on buys, sells, and collects by others, learn more here
                      <FontAwesomeIcon icon={faQuestionCircle} className="text-green-500"/>
                    </a>
                  </div>
                  <div className="text-center">
                    <div className="mt-5 font-bold text-2xl">
                      <div className="w-max max-w-full mx-auto">
                        You can collect your BNB at : {nextclaimdateLocale}
                        <div className="text-sm text-center md:text-right text-green-500">{nextclaimdateGmt}</div>
                      </div>
                    </div>
                    <Button className="mt-5" onClick={onCollect} disabled = {!BNBNum || mynextclaimdate.toNumber() > nowdate.toNumber()}>
                      <FontAwesomeIcon icon={faHandPointer} className="mr-1"/>
                      Collect my BNB
                    </Button>
                  </div>
                </div>
                <div className="w-full px-10 py-8 rounded-xl shadow-2xl mt-10 border border-solid border-yellow-300 text-white">
                  <div>
                    Disruptive Transfer between 2 wallets
                    <a href={DOC_ANTI_WHALES_URL} className="ml-10" target="_blank" rel="noreferrer">
                      <FontAwesomeIcon icon={faQuestionCircle} className="text-green-500"/>
                    </a>
                    <b className="ml-16">Balance: {fullBalance} SHIELD</b>
                  </div>
                  <div className="w-full sm:w-3/5 mx-auto mt-5">
                    <div className="w-full grid grid-cols-3 gap-2">
                      <div className="text-right py-2">
                        <b>Recipient (address)</b>
                      </div>
                      <div className="col-span-2">
                        <Input
                          onChange = {handleAddressChange}
                        />
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-3 gap-2 mt-4">
                      <div className="text-right py-2">
                        <b>Amount (SHIELD)</b>
                      </div>
                      <div className="col-span-2">
                        <TokenInput
                          value={val}
                          onSelectMax={handleSelectMax}
                          onChange={handleChange}
                          max={fullBalance}
                          symbol={tokenName}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-5">
                    <Button onClick={async () => {
                      setPendingTx(true)
                      await onSend(val, sendAddress)
                      setPendingTx(false)
                    }} disabled = {pendingTx || !val || val === "0" || sendAddress === ""}>
                      <FontAwesomeIcon icon={faPaperPlane} className="mr-1"/>
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </Page>
  )
}

export default Home
