declare module '@wallet-standard/core' {
    interface Wallet {
        /**
         * Unique identifier of the Wallet.
         *
         * If not provided, the wallet name will be used as the identifier.
         */
        readonly id?: string;
    }
}
export type { Wallet } from '@wallet-standard/core';
