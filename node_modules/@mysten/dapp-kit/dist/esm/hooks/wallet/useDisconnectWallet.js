// src/hooks/wallet/useDisconnectWallet.ts
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

// src/hooks/wallet/useDisconnectWallet.ts
function useDisconnectWallet({
  mutationKey,
  ...mutationOptions
} = {}) {
  const { currentWallet } = useCurrentWallet();
  const setWalletDisconnected = useWalletStore((state) => state.setWalletDisconnected);
  return useMutation({
    mutationKey: walletMutationKeys.disconnectWallet(mutationKey),
    mutationFn: async () => {
      if (!currentWallet) {
        throw new WalletNotConnectedError("No wallet is connected.");
      }
      try {
        await currentWallet.features["standard:disconnect"]?.disconnect();
      } catch (error) {
        console.error("Failed to disconnect the application from the current wallet.", error);
      }
      setWalletDisconnected();
    },
    ...mutationOptions
  });
}
export {
  useDisconnectWallet
};
//# sourceMappingURL=useDisconnectWallet.js.map
