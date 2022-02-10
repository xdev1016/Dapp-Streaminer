import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import pizzaABI from 'config/abi/pizza.json'
import { getContract } from 'utils/web3'
import { getMoonBalance, getNextClaimDate, getSlotBalance, getTokenBalance, getTotalLiquidty, getLpBnbBalance, getLpMshieldBalance } from 'utils/erc20'
import { getShieldAddress } from 'utils/addressHelpers'
import useRefresh from './useRefresh'
import { useGettigTime } from './useContract'

export const useSlotBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getSlotBalance(ethereum, account)
      setBalance(new BigNumber(res))
    }

    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, tokenAddress, fastRefresh])

  return balance
}

export const useMoonBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getMoonBalance(ethereum, account)
      setBalance(new BigNumber(res))
    }

    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, tokenAddress, fastRefresh])

  return balance
}

export const useNextClaimDate = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getNextClaimDate(ethereum, account)
      setBalance(new BigNumber(res))
    }

    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, tokenAddress, fastRefresh])

  return balance
}

export const useTotalLiquidity = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { ethereum }: { ethereum: provider } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTotalLiquidty(ethereum, '0xF565aaf0b8EB813a1c8C956D2C59F1ce27FD2366')
      setBalance(new BigNumber(res))
    }

    if (ethereum) {
      fetchBalance()
    }
  }, [ethereum, fastRefresh])

  return balance
}

export const useLPTotalLiquidity = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { ethereum }: { ethereum: provider } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTotalLiquidty(ethereum, '0x241059E222F675D9Ce4FbDc1505F6FD61Fb770Db')
      setBalance(new BigNumber(res))
    }

    if (ethereum) {
      fetchBalance()
    }
  }, [ethereum, fastRefresh])

  return balance
}

export const useLPBnbamount = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { ethereum }: { ethereum: provider } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getLpBnbBalance(ethereum)
      setBalance(new BigNumber(res))
    }

    if (ethereum) {
      fetchBalance()
    }
  }, [ethereum, fastRefresh])

  return balance
}

export const useLPMshieldamount = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { ethereum }: { ethereum: provider } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getLpMshieldBalance(ethereum)
      setBalance(new BigNumber(res))
    }

    if (ethereum) {
      fetchBalance()
    }
  }, [ethereum, fastRefresh])

  return balance
}

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const pizzaContract = getContract(pizzaABI, getShieldAddress())
      const supply = await pizzaContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTokenBalance(ethereum, tokenAddress, '0x000000000000000000000000000000000000dEaD')
      setBalance(new BigNumber(res))
    }

    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, tokenAddress, slowRefresh])

  return balance
}

export default useSlotBalance
