/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { NativeAuthError } from "../../error/NativeAuthError.js";
import { UnexpectedError } from "../../error/UnexpectedError.js";
import { HandlerBase } from "../handler/HandlerBase.js";

export abstract class ResultBase<
    TResult = void,
    THandler extends HandlerBase | void = void
> {
    result?: TResult extends void ? never : TResult;
    error?: NativeAuthError;
    nextStateHandler?: THandler extends void ? never : THandler;

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

    isSuccess(): boolean {
        return !this.error;
    }

    isFlowCompleted(): boolean {
        return !this.result;
    }
}
