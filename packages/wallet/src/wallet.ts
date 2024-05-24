// packages/wallet/src/wallet.ts

import { StargateClient, SigningCosmWasmClient } from '@cosmjs/stargate';
import { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
  interface Window extends KeplrWindow {}
}

export async function connectKeplr(): Promise<SigningCosmWasmClient> {
  if (!window.keplr) {
    throw new Error("Keplr extension not found");
  }

  await window.keplr.enable("osmosis-1");
  const offlineSigner = window.keplr.getOfflineSigner("osmosis-1");
  const accounts = await offlineSigner.getAccounts();
  const client = await StargateClient.connect(
    'https://rpc-osmosis.blockapsis.com',
  );

  return {client, accounts};
}


export async function getBalance(
  client: SigningCosmWasmClient,
  address: string
): Promise<string> {
    const balance = await client.getBalance(address, "uosmo");
  return balance.amount;
}