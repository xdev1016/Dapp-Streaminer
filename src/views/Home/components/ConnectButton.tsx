import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useWalletModal } from '@pizzafinance/ui-sdk'
import Button from 'components/Button'

const ConnectButton = (props) => {
  const { connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)
  const { account } = props;
  const accountEllipsis = account ? `${account.substring(0, 4)  }...${  account.substring(account.length - 4)}` : null;
  const localStorageKey = "accountStatus";
  const logout = ()=>{
    reset();
    window.localStorage.removeItem(localStorageKey);
    window.localStorage.removeItem("showShieldSwapMsg")
    window.location.reload();
  }
  if(account === null){
    return (
        <Button onClick={onPresentConnectModal}>
          <FontAwesomeIcon icon={faLink} className="mr-1" />
          Connect
        </Button>
    )
  }
  return (
  <div className="dropdown inline-block relative">
    <Button type="button" title={account}>
      {accountEllipsis}
    </Button>
    <div className="w-full h-5 absolute"> </div>
    <ul className="hidden w-full dropdown-menu absolute py-1 list-none text-center bg-purple-1000 top-14">
      <div className="arrow-up absolute -top-1 left-12"> </div>
      <li className="hover:bg-purple-900">
        <Button onClick={ logout }>
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
          Logout
        </Button>
      </li>
    </ul>
  </div>
  )
}

export default ConnectButton
