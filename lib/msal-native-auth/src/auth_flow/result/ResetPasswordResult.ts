/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    ResetPasswordCodeRequiredHandler,
    ResetPasswordPasswordRequiredHandler,
} from "../handler/ResetPasswordHandler.js";
import { ResultBase } from "./ResultBase.js";
import { SignInContinuationHandler } from "../handler/SignInHandler.js";

export class ResetPasswordStartResult extends ResultBase<
    void,
    ResetPasswordCodeRequiredHandler
> {}

export class ResetPasswordSubmitCodeResult extends ResultBase<
    void,
    ResetPasswordPasswordRequiredHandler
> {}

export class ResetPasswordSubmitPasswordResult extends ResultBase<
    void,
    SignInContinuationHandler
> {
    isFlowCompleted(): boolean {
        return true;
    }
}

export class ResetPasswordResendCodeResult extends ResultBase<
    void,
    ResetPasswordCodeRequiredHandler
> {}
