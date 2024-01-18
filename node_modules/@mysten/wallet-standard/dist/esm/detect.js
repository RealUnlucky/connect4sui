const REQUIRED_FEATURES = [
  "standard:connect",
  "standard:events"
];
function isWalletWithSuiFeatures(wallet, features = []) {
  return [...REQUIRED_FEATURES, ...features].every((feature) => feature in wallet.features);
}
function isWalletWithRequiredFeatureSet(wallet, additionalFeatures = []) {
  return [...REQUIRED_FEATURES, ...additionalFeatures].every(
    (feature) => feature in wallet.features
  );
}
export {
  isWalletWithRequiredFeatureSet,
  isWalletWithSuiFeatures
};
//# sourceMappingURL=detect.js.map
