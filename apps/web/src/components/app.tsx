'use client'

// import { useMutation } from "@tanstack/react-query";
import { connectKeplr, getBalance } from "../../../../packages/wallet/src/wallet";
import { useAtom } from "jotai";
import { walletAtom } from "../../state/wallet-atom";
import Balance from "./balance";

export function ConnectWallter(): JSX.Element  {

  // wallet Atom
  const [wallet, setWallet] = useAtom(walletAtom)

  // handle wallet connection
  async function handleConnectWallet():Promise<void> {
    const { accounts, client } = await connectKeplr();
    const balance = await getBalance(client, accounts[0].address)
    if (Array.isArray(accounts) && accounts.length > 0) {
      const firstAccount: Account = accounts[0];
      setWallet({
        address: firstAccount.address,
        client,
        isConnected: true,
        balance: balance
      })
     
    }
  }

  const {isConnected} = wallet || {}

  return (
    <div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleConnectWallet} type="button">
       { isConnected ? 'Connected' : 'Connect Wallet'}
      </button>

      <Balance/>
    </div>
  )
}
