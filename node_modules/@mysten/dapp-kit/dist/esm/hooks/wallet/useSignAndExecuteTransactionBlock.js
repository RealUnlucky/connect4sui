// src/hooks/wallet/useSignAndExecuteTransactionBlock.ts
import { useMutation } from "@tanstack/react-query";

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
import { useContext } from "react";

// src/components/SuiClientProvider.tsx
import { getFullnodeUrl, isSuiClient, SuiClient } from "@mysten/sui.js/client";
import { createContext, useMemo, useState } from "react";
import { jsx } from "react/jsx-runtime";
var SuiClientContext = createContext(null);
var DEFAULT_NETWORKS = {
  localnet: { url: getFullnodeUrl("localnet") }
};

// src/hooks/useSuiClient.ts
function useSuiClientContext() {
  const suiClient = useContext(SuiClientContext);
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
import { useContext as useContext2 } from "react";
import { useStore } from "zustand";

// src/contexts/walletContext.ts
import { createContext as createContext2 } from "react";
var WalletContext = createContext2(null);

// src/hooks/wallet/useWalletStore.ts
function useWalletStore(selector) {
  const store = useContext2(WalletContext);
  if (!store) {
    throw new Error(
      "Could not find WalletContext. Ensure that you have set up the WalletProvider."
    );
  }
  return useStore(store, selector);
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
  return useMutation({
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
export {
  useSignAndExecuteTransactionBlock
};
//# sourceMappingURL=useSignAndExecuteTransactionBlock.js.map
