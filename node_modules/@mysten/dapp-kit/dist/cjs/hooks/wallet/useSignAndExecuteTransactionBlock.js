"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/hooks/wallet/useSignAndExecuteTransactionBlock.ts
var useSignAndExecuteTransactionBlock_exports = {};
__export(useSignAndExecuteTransactionBlock_exports, {
  useSignAndExecuteTransactionBlock: () => useSignAndExecuteTransactionBlock
});
module.exports = __toCommonJS(useSignAndExecuteTransactionBlock_exports);
var import_react_query = require("@tanstack/react-query");

// src/constants/walletMutationKeys.ts
var walletMutationKeys = {
  all: { baseScope: "wallet" },
  connectWallet: formMutationKeyFn("connect-wallet"),
  autoconnectWallet: formMutationKeyFn("autoconnect-wallet"),
  disconnectWallet: formMutationKeyFn("disconnect-wallet"),
  signPersonalMessage: formMutationKeyFn("sign-personal-message"),
  signTransactionBlock: formMutationKeyFn("sign-transaction-block"),
  signAndExecuteTransactionBlock: formMutationKeyFn("sign-and-execute-transaction-block"),
  switchAccount: formMutationKeyFn("switch-account")
};
function formMutationKeyFn(baseEntity) {
  return function mutationKeyFn(additionalKeys = []) {
    return [{ ...walletMutationKeys.all, baseEntity }, ...additionalKeys];
  };
}

// src/errors/walletErrors.ts
var WalletNotConnectedError = class extends Error {
};
var WalletNoAccountSelectedError = class extends Error {
};
var WalletFeatureNotSupportedError = class extends Error {
};

// src/hooks/useSuiClient.ts
var import_react2 = require("react");

// src/components/SuiClientProvider.tsx
var import_client = require("@mysten/sui.js/client");
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var SuiClientContext = (0, import_react.createContext)(null);
var DEFAULT_NETWORKS = {
  localnet: { url: (0, import_client.getFullnodeUrl)("localnet") }
};

// src/hooks/useSuiClient.ts
function useSuiClientContext() {
  const suiClient = (0, import_react2.useContext)(SuiClientContext);
  if (!suiClient) {
    throw new Error(
      "Could not find SuiClientContext. Ensure that you have set up the SuiClientProvider"
    );
  }
  return suiClient;
}
function useSuiClient() {
  return useSuiClientContext().client;
}

// src/hooks/wallet/useWalletStore.ts
var import_react4 = require("react");
var import_zustand = require("zustand");

// src/contexts/walletContext.ts
var import_react3 = require("react");
var WalletContext = (0, import_react3.createContext)(null);

// src/hooks/wallet/useWalletStore.ts
function useWalletStore(selector) {
  const store = (0, import_react4.useContext)(WalletContext);
  if (!store) {
    throw new Error(
      "Could not find WalletContext. Ensure that you have set up the WalletProvider."
    );
  }
  return (0, import_zustand.useStore)(store, selector);
}

// src/hooks/wallet/useCurrentAccount.ts
function useCurrentAccount() {
  return useWalletStore((state) => state.currentAccount);
}

// src/hooks/wallet/useCurrentWallet.ts
function useCurrentWallet() {
  const currentWallet = useWalletStore((state) => state.currentWallet);
  const connectionStatus = useWalletStore((state) => state.connectionStatus);
  switch (connectionStatus) {
    case "connecting":
      return {
        connectionStatus,
        currentWallet: null,
        isDisconnected: false,
        isConnecting: true,
        isConnected: false
      };
    case "disconnected":
      return {
        connectionStatus,
        currentWallet: null,
        isDisconnected: true,
        isConnecting: false,
        isConnected: false
      };
    case "connected": {
      return {
        connectionStatus,
        currentWallet,
        isDisconnected: false,
        isConnecting: false,
        isConnected: true
      };
    }
  }
}

// src/hooks/wallet/useSignAndExecuteTransactionBlock.ts
function useSignAndExecuteTransactionBlock({
  mutationKey,
  executeFromWallet,
  ...mutationOptions
} = {}) {
  const { currentWallet } = useCurrentWallet();
  const currentAccount = useCurrentAccount();
  const client = useSuiClient();
  return (0, import_react_query.useMutation)({
    mutationKey: walletMutationKeys.signAndExecuteTransactionBlock(mutationKey),
    mutationFn: async ({ requestType, options, ...signTransactionBlockArgs }) => {
      if (!currentWallet) {
        throw new WalletNotConnectedError("No wallet is connected.");
      }
      const signerAccount = signTransactionBlockArgs.account ?? currentAccount;
      if (!signerAccount) {
        throw new WalletNoAccountSelectedError(
          "No wallet account is selected to sign and execute the transaction block with."
        );
      }
      if (executeFromWallet) {
        const walletFeature2 = currentWallet.features["sui:signAndExecuteTransactionBlock"];
        if (!walletFeature2) {
          throw new WalletFeatureNotSupportedError(
            "This wallet doesn't support the `signAndExecuteTransactionBlock` feature."
          );
        }
        return walletFeature2.signAndExecuteTransactionBlock({
          ...signTransactionBlockArgs,
          account: signerAccount,
          chain: signTransactionBlockArgs.chain ?? signerAccount.chains[0],
          requestType,
          options
        });
      }
      const walletFeature = currentWallet.features["sui:signTransactionBlock"];
      if (!walletFeature) {
        throw new WalletFeatureNotSupportedError(
          "This wallet doesn't support the `signTransactionBlock` feature."
        );
      }
      const { signature, transactionBlockBytes } = await walletFeature.signTransactionBlock({
        ...signTransactionBlockArgs,
        account: signerAccount,
        chain: signTransactionBlockArgs.chain ?? signerAccount.chains[0]
      });
      return client.executeTransactionBlock({
        transactionBlock: transactionBlockBytes,
        signature,
        requestType,
        options
      });
    },
    ...mutationOptions
  });
}
//# sourceMappingURL=useSignAndExecuteTransactionBlock.js.map
