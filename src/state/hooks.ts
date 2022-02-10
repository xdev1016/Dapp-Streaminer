import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmsPublicDataAsync, fetchPoolsPublicDataAsync } from './actions'
import { Farm, State } from './types'
import { useGettigTime } from '../hooks/useContract'

const ZERO = new BigNumber(0)

export const useFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])
}

// Farms
export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}
// Prices
export const usePriceBnbBusd = (): BigNumber => {
  // const pid = 6 // USDT-BNB LP
  const pid = 2 // USDT-BNB LP
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(1).div(farm.tokenPriceVsQuote) : ZERO
}

export const useGettingTime = () => {
  const [time, setTime] = useState(new BigNumber(0))
  const getTimeContract = useGettigTime()

  useEffect(() => {
    const fetchTime = async () => {
      const res = await getTimeContract.methods.gettingtime().call()
      setTime(new BigNumber(res))
    }
    fetchTime()
  }, [time,setTime,getTimeContract])

  return time
}