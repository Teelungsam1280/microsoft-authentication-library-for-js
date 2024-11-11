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

/*
 * Result of a reset password operation.
 */
export class ResetPasswordStartResult extends ResultBase<
    void,
    ResetPasswordCodeRequiredHandler
> {}

/*
 * Result of a reset password operation that requires a code.
 */
export class ResetPasswordSubmitCodeResult extends ResultBase<
    void,
    ResetPasswordPasswordRequiredHandler
> {}

/*
 * Result of a reset password operation that requires a password.
 */
export class ResetPasswordSubmitPasswordResult extends ResultBase<
    void,
    SignInContinuationHandler
> {
    /*
     * Checks if the flow is completed.
     * @returns True if the flow is completed, false otherwise.
     */
    isFlowCompleted(): boolean {
        return true;
    }
}

/*
 * Result of resending code in a reset password operation.
 */
export class ResetPasswordResendCodeResult extends ResultBase<
    void,
    ResetPasswordCodeRequiredHandler
> {}
