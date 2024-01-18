import type { MutationKey } from '@tanstack/react-query';
export declare const walletMutationKeys: {
    all: {
        baseScope: string;
    };
    connectWallet: (additionalKeys?: MutationKey) => unknown[];
    autoconnectWallet: (additionalKeys?: MutationKey) => unknown[];
    disconnectWallet: (additionalKeys?: MutationKey) => unknown[];
    signPersonalMessage: (additionalKeys?: MutationKey) => unknown[];
    signTransactionBlock: (additionalKeys?: MutationKey) => unknown[];
    signAndExecuteTransactionBlock: (additionalKeys?: MutationKey) => unknown[];
    switchAccount: (additionalKeys?: MutationKey) => unknown[];
};
