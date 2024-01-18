import type { Wallet, WalletWithFeatures } from '@mysten/wallet-standard';
export declare function getRegisteredWallets<AdditionalFeatures extends Wallet['features']>(preferredWallets: string[], requiredFeatures?: (keyof AdditionalFeatures)[]): WalletWithFeatures<import("@mysten/wallet-standard").StandardConnectFeature & import("@mysten/wallet-standard").StandardEventsFeature & AdditionalFeatures>[];
export declare function getWalletUniqueIdentifier(wallet?: Wallet): string | undefined;
