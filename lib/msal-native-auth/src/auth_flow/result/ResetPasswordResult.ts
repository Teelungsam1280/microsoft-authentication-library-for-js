/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    ResetPasswordCodeRequiredState,
    ResetPasswordPasswordRequiredState,
} from "../state/ResetPasswordState.js";
import { ResultBase } from "./ResultBase.js";
import { SignInContinuationState } from "../state/SignInState.js";

/*
 * Result of a reset password operation.
 */
export class ResetPasswordStartResult extends ResultBase<
    void,
    ResetPasswordCodeRequiredState
> {}

/*
 * Result of a reset password operation that requires a code.
 */
export class ResetPasswordSubmitCodeResult extends ResultBase<
    void,
    ResetPasswordPasswordRequiredState
> {}

/*
 * Result of a reset password operation that requires a password.
 */
export class ResetPasswordSubmitPasswordResult extends ResultBase<
    void,
    SignInContinuationState
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
    ResetPasswordCodeRequiredState
> {}
