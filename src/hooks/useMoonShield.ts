import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { collectBNB, sendToken } from 'utils/callHelpers'
import moonShield from 'config/abi/moonShield.json'
import addresses from 'config/constants/contracts'
import { AbiItem } from 'web3-utils'
import useContract from './useContract'

export const useCollectBNB = () => {
  const { account } = useWallet()
  const abi = (moonShield as unknown) as AbiItem
  const moonContract = useContract(abi, addresses.moonShield[56])

  const handleCollect = useCallback(
    async () => {
      const txHash = await collectBNB(moonContract, account)
      console.info(txHash)
    },
    [account, moonContract],
  )

  return { onCollect: handleCollect }
}

export const useSendToken = () => {
  const { account } = useWallet()
  const abi = (moonShield as unknown) as AbiItem
  const moonContract = useContract(abi, addresses.moonShield[56])

  const handleSend = useCallback(
    async (amount: string, address : string) => {
      const txHash = await sendToken(moonContract, amount, address, account)
      console.info(txHash)
    },
    [account, moonContract],
  )

  return { onSend: handleSend }
}

const p = 1000
export default p;
