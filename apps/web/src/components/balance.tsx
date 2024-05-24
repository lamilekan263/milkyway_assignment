import React from 'react';
import { useAtom } from 'jotai';
import { walletAtom } from '../../state/wallet-atom';


const Balance: React.FC = () => {
  const [wallet] = useAtom(walletAtom);
  if (!wallet) {
    return null;
  }

    return <div className='text-2xl text-red-200'>Balance:  { wallet.balance} OSMO</div>;
};

export default Balance;