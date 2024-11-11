/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { NativeAuthError } from "../../error/NativeAuthError.js";
import { UnexpectedError } from "../../error/UnexpectedError.js";
import { HandlerBase } from "../handler/HandlerBase.js";

/*
 * Base class for a result of an authentication operation.
 * @typeParam TResult - The type of the result data.
 * @typeParam THandler - The type of the next state handler.
 */
export abstract class ResultBase<
    TResult = void,
    THandler extends HandlerBase | void = void
> {
    /*
     *constructor for ResultBase
     * @param resultData - The result data.
     * @param nextStateHandler - The next state handler.
     * @typeParam TResult - The type of the result data.
     * @typeParam THandler - The type of the next state handler.
     */
    constructor(
        public resultData?: TResult,
        public nextStateHandler?: THandler
    ) {
        this.resultData = resultData;
        this.nextStateHandler = nextStateHandler;
    }

    /*
     * The error that occurred during the authentication operation.
     */
    error?: NativeAuthError;

    /*
     * Creates a result with an error.
     * @param error - The error that occurred.
     * @returns The result.
     * @typeParam TResult - The type of the result data.
     * @typeParam THandler - The type of the next state handler.
     * @typeParam TActionResult - The type of the result.
     */
    static createWithError<
        TResult,
        THandler extends HandlerBase | void,
        TActionResult extends ResultBase<TResult, THandler>
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
        return !this.resultData;
    }
}
