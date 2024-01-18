import type { WalletWithRequiredFeatures } from '@mysten/wallet-standard';
/**
 * Internal hook for easily handling the addition and removal of new wallets.
 */
export declare function useWalletsChanged(preferredWallets: string[], requiredFeatures: (keyof WalletWithRequiredFeatures['features'])[]): void;
