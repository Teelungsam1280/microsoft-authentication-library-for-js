/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { NativeAuthError } from "../../error/NativeAuthError.js";
import { UnexpectedError } from "../../error/UnexpectedError.js";
import { AuthFlowStateBase } from "../state/AuthFlowStateBase.js";

/*
 * Base class for a result of an authentication operation.
 * @typeParam TState - The type of the result data.
 * @typeParam TState - The type of state.
 */
export abstract class ResultBase<
    TData = void,
    TState extends AuthFlowStateBase | void = void
> {
    /*
     *constructor for ResultBase
     * @param data - The result data.
     * @param state - The state.
     * @typeParam TData - The type of the result data.
     * @typeParam TState - The type of state.
     */
    constructor(public data?: TData, public state?: TState) {}

    /*
     * The error that occurred during the authentication operation.
     */
    error?: NativeAuthError;

    /*
     * Creates a result with an error.
     * @param error - The error that occurred.
     * @returns The result.
     * @typeParam TData - The type of the result data.
     * @typeParam TState - The type of state.
     * @typeParam TActionResult - The type of the result.
     */
    static createWithError<
        TData,
        TState extends AuthFlowStateBase | void,
        TActionResult extends ResultBase<TData, TState>
    >(this: new () => TActionResult, error: unknown): TActionResult {
        let nativeAuthError: NativeAuthError;

        if (error instanceof NativeAuthError) {
            nativeAuthError = error;
        } else {
            nativeAuthError = new UnexpectedError(error);
        }

        const errorResult = new this();
        errorResult.error = nativeAuthError;
        return errorResult;
    }

    /*
     * Checks if the result is successful.
     * @returns True if the result is successful, false otherwise.
     */
    isSuccess(): boolean {
        return !this.error;
    }

    /*
     * Checks if the flow is completed.
     * @returns True if the flow is completed, false otherwise.
     */
    isFlowCompleted(): boolean {
        return !this.data;
    }
}
