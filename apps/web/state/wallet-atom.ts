
import { atom } from 'jotai';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';

export interface Wallet {
    address: string;
    client: SigningCosmWasmClient;
    isConnected: boolean;
    balance: null
}

export const walletAtom = atom<Wallet | null>(null);