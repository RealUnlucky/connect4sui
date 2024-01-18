import type { ButtonHTMLAttributes, ReactNode } from 'react';
type ConnectButtonProps = {
    connectText?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export declare function ConnectButton({ connectText, ...buttonProps }: ConnectButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
