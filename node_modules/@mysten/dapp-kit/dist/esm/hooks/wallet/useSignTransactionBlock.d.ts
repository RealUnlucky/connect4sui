import type { SuiSignTransactionBlockInput, SuiSignTransactionBlockOutput } from '@mysten/wallet-standard';
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { WalletFeatureNotSupportedError, WalletNoAccountSelectedError, WalletNotConnectedError } from '../..//errors/walletErrors.js';
import type { PartialBy } from '../../types/utilityTypes.js';
type UseSignTransactionBlockArgs = PartialBy<SuiSignTransactionBlockInput, 'account' | 'chain'>;
type UseSignTransactionBlockResult = SuiSignTransactionBlockOutput;
type UseSignTransactionBlockError = WalletFeatureNotSupportedError | WalletNoAccountSelectedError | WalletNotConnectedError | Error;
type UseSignTransactionBlockMutationOptions = Omit<UseMutationOptions<UseSignTransactionBlockResult, UseSignTransactionBlockError, UseSignTransactionBlockArgs, unknown>, 'mutationFn'>;
/**
 * Mutation hook for prompting the user to sign a transaction block.
 */
export declare function useSignTransactionBlock({ mutationKey, ...mutationOptions }?: UseSignTransactionBlockMutationOptions): UseMutationResult<UseSignTransactionBlockResult, UseSignTransactionBlockError, UseSignTransactionBlockArgs>;
export {};
