import type { SuiSignAndExecuteTransactionBlockInput, SuiSignAndExecuteTransactionBlockOutput } from '@mysten/wallet-standard';
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { WalletFeatureNotSupportedError, WalletNoAccountSelectedError, WalletNotConnectedError } from '../../errors/walletErrors.js';
import type { PartialBy } from '../../types/utilityTypes.js';
type UseSignAndExecuteTransactionBlockArgs = PartialBy<SuiSignAndExecuteTransactionBlockInput, 'account' | 'chain'>;
type UseSignAndExecuteTransactionBlockResult = SuiSignAndExecuteTransactionBlockOutput;
type UseSignAndExecuteTransactionBlockError = WalletFeatureNotSupportedError | WalletNoAccountSelectedError | WalletNotConnectedError | Error;
type UseSignAndExecuteTransactionBlockMutationOptions = Omit<UseMutationOptions<UseSignAndExecuteTransactionBlockResult, UseSignAndExecuteTransactionBlockError, UseSignAndExecuteTransactionBlockArgs, unknown>, 'mutationFn'> & {
    executeFromWallet?: boolean;
};
/**
 * Mutation hook for prompting the user to sign and execute a transaction block.
 */
export declare function useSignAndExecuteTransactionBlock({ mutationKey, executeFromWallet, ...mutationOptions }?: UseSignAndExecuteTransactionBlockMutationOptions): UseMutationResult<UseSignAndExecuteTransactionBlockResult, UseSignAndExecuteTransactionBlockError, UseSignAndExecuteTransactionBlockArgs>;
export {};
