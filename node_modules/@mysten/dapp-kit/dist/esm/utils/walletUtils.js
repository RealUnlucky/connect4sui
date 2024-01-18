// src/utils/walletUtils.ts
import { getWallets, isWalletWithRequiredFeatureSet } from "@mysten/wallet-standard";
function getRegisteredWallets(preferredWallets, requiredFeatures) {
  const walletsApi = getWallets();
  const wallets = walletsApi.get();
  const suiWallets = wallets.filter(
    (wallet) => isWalletWithRequiredFeatureSet(wallet, requiredFeatures)
  );
  return [
    // Preferred wallets, in order:
    ...preferredWallets.map((name) => suiWallets.find((wallet) => wallet.name === name)).filter(Boolean),
    // Wallets in default order:
    ...suiWallets.filter((wallet) => !preferredWallets.includes(wallet.name))
  ];
}
function getWalletUniqueIdentifier(wallet) {
  return wallet?.id ?? wallet?.name;
}
export {
  getRegisteredWallets,
  getWalletUniqueIdentifier
};
//# sourceMappingURL=walletUtils.js.map
