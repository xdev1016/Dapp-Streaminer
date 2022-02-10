import addresses from 'config/constants/contracts'

const chainId = process.env.REACT_APP_CHAIN_ID

export const getShieldAddress = () => {
  return addresses.moonShield[chainId]
}
export const getPastaAddress = () => {
  return addresses.pasta[chainId]
}
export const getMasterChefAddress = () => {
  return addresses.masterChef[chainId]
}
export const getMulticallAddress = () => {
  return addresses.mulltiCall[chainId]
}
export const getWbnbAddress = () => {
  return addresses.wbnb[chainId]
}
export const getSlotAddress = () => {
  return addresses.slot[chainId]
}
export const getPancakePairAddress = () => {
  return addresses.pancakepair[chainId]
}
export const getGettingTimeAddress = () => {
  return addresses.gettingtime[chainId]
}

