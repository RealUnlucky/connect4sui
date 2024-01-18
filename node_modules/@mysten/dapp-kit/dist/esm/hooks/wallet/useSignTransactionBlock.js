// src/hooks/wallet/useSignTransactionBlock.ts
import { useMutation } from "@tanstack/react-query";

// src/errors/walletErrors.ts
var WalletNotConnectedError = class extends Error {
};
var WalletNoAccountSelectedError = class extends Error {
};
var WalletFeatureNotSupportedError = class extends Error {
};

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

// src/hooks/wallet/useWalletStore.ts
import { useContext } from "react";
import { useStore } from "zustand";

// src/contexts/walletContext.ts
import { createContext } from "react";
var WalletContext = createContext(null);

// src/hooks/wallet/useWalletStore.ts
function useWalletStore(selector) {
  const store = useContext(WalletContext);
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

// src/hooks/wallet/useSignTransactionBlock.ts
function useSignTransactionBlock({
  mutationKey,
  ...mutationOptions
} = {}) {
  const { currentWallet } = useCurrentWallet();
  const currentAccount = useCurrentAccount();
  return useMutation({
    mutationKey: walletMutationKeys.signTransactionBlock(mutationKey),
    mutationFn: async (signTransactionBlockArgs) => {
      if (!currentWallet) {
        throw new WalletNotConnectedError("No wallet is connected.");
      }
      const signerAccount = signTransactionBlockArgs.account ?? currentAccount;
      if (!signerAccount) {
        throw new WalletNoAccountSelectedError(
          "No wallet account is selected to sign the transaction block with."
        );
      }
      const walletFeature = currentWallet.features["sui:signTransactionBlock"];
      if (!walletFeature) {
        throw new WalletFeatureNotSupportedError(
          "This wallet doesn't support the `SignTransactionBlock` feature."
        );
      }
      return await walletFeature.signTransactionBlock({
        ...signTransactionBlockArgs,
        account: signerAccount,
        chain: signTransactionBlockArgs.chain ?? signerAccount.chains[0]
      });
    },
    ...mutationOptions
  });
}
export {
  useSignTransactionBlock
};
//# sourceMappingURL=useSignTransactionBlock.js.map
