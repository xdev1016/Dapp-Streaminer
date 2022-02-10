import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'DEGG',
    lpAddresses: {
      97: '0x3219991f961f86c264aD7DD8788631423911037E',
      56: '0x3219991f961f86c264aD7DD8788631423911037E',
    },
    tokenSymbol: 'DGEM',
    tokenAddresses: {
      97: '0x3219991f961f86c264aD7DD8788631423911037E',
      56: '0x83eC486d4658BAF570cf1cCE0872c0dD52b79c15',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'DEGG-BNB LP',
    lpAddresses: {
      97: '0x3219991f961f86c264aD7DD8788631423911037E',
      56: '0xf18e3518be5484d1c367340884ea6c740f24ef87',
    },
    tokenSymbol: 'DEGG',
    tokenAddresses: {
      97: '0x3219991f961f86c264aD7DD8788631423911037E',
      56: '0x3219991f961f86c264aD7DD8788631423911037E',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '0x3219991f961f86c264aD7DD8788631423911037E',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '0x3219991f961f86c264aD7DD8788631423911037E',
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    isCommunity: false,
  },  
]

export default farms
