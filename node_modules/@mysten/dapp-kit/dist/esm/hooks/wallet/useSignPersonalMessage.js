// src/hooks/wallet/useSignPersonalMessage.ts
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

// src/hooks/wallet/useSignPersonalMessage.ts
function useSignPersonalMessage({
  mutationKey,
  ...mutationOptions
} = {}) {
  const { currentWallet } = useCurrentWallet();
  const currentAccount = useCurrentAccount();
  return useMutation({
    mutationKey: walletMutationKeys.signPersonalMessage(mutationKey),
    mutationFn: async (signPersonalMessageArgs) => {
      if (!currentWallet) {
        throw new WalletNotConnectedError("No wallet is connected.");
      }
      const signerAccount = signPersonalMessageArgs.account ?? currentAccount;
      if (!signerAccount) {
        throw new WalletNoAccountSelectedError(
          "No wallet account is selected to sign the personal message with."
        );
      }
      const signPersonalMessageFeature = currentWallet.features["sui:signPersonalMessage"];
      if (signPersonalMessageFeature) {
        return await signPersonalMessageFeature.signPersonalMessage({
          ...signPersonalMessageArgs,
          account: signerAccount
        });
      }
      const signMessageFeature = currentWallet.features["sui:signMessage"];
      if (signMessageFeature) {
        console.warn(
          "This wallet doesn't support the `signPersonalMessage` feature... falling back to `signMessage`."
        );
        const { messageBytes, signature } = await signMessageFeature.signMessage({
          ...signPersonalMessageArgs,
          account: signerAccount
        });
        return { bytes: messageBytes, signature };
      }
      throw new WalletFeatureNotSupportedError(
        "This wallet doesn't support the `signPersonalMessage` feature."
      );
    },
    ...mutationOptions
  });
}
export {
  useSignPersonalMessage
};
//# sourceMappingURL=useSignPersonalMessage.js.map
