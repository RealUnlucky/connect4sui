import type { WalletWithRequiredFeatures } from '@mysten/wallet-standard';
type WalletListProps = {
    selectedWalletName?: string;
    onPlaceholderClick: () => void;
    onSelect: (wallet: WalletWithRequiredFeatures) => void;
};
export declare function WalletList({ selectedWalletName, onPlaceholderClick, onSelect }: WalletListProps): import("react/jsx-runtime").JSX.Element;
export {};
