import type { ReactNode } from 'react';
type ControlledModalProps = {
    /** The controlled open state of the dialog. */
    open: boolean;
    /** Event handler called when the open state of the dialog changes. */
    onOpenChange: (open: boolean) => void;
    defaultOpen?: never;
};
type UncontrolledModalProps = {
    open?: never;
    onOpenChange?: never;
    /** The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. */
    defaultOpen?: boolean;
};
type ConnectModalProps = {
    /** The trigger button that opens the dialog. */
    trigger: NonNullable<ReactNode>;
} & (ControlledModalProps | UncontrolledModalProps);
export declare function ConnectModal({ trigger, open, defaultOpen, onOpenChange }: ConnectModalProps): import("react/jsx-runtime").JSX.Element;
export {};
