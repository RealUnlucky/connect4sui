import type { Wallet, WalletWithFeatures } from '@wallet-standard/core';
import type { MinimallyRequiredFeatures, WalletWithSuiFeatures } from './features/index.js';
/** @deprecated Use isWalletWithRequiredFeatureSet instead since it provides more accurate typing! */
export declare function isWalletWithSuiFeatures(wallet: Wallet, 
/** Extra features that are required to be present, in addition to the expected feature set. */
features?: string[]): wallet is WalletWithSuiFeatures;
export declare function isWalletWithRequiredFeatureSet<AdditionalFeatures extends Wallet['features']>(wallet: Wallet, additionalFeatures?: (keyof AdditionalFeatures)[]): wallet is WalletWithFeatures<MinimallyRequiredFeatures & AdditionalFeatures>;
