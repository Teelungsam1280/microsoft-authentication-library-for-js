/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    SignUpAttributesRequiredHandler,
    SignUpCodeRequiredHandler,
    SignUpPasswordRequiredHandler,
} from "../handler/SignUpHandler.js";
import { ResultBase } from "./ResultBase.js";
import { SignInContinuationHandler } from "../handler/SignInHandler.js";

/*
 * Result of a sign-up operation.
 */
export class SignUpResult extends ResultBase<
    void,
    | SignUpCodeRequiredHandler
    | SignUpPasswordRequiredHandler
    | SignUpAttributesRequiredHandler
    | SignInContinuationHandler
> {
    /*
     * Checks if the flow is completed.
     * @returns True if the flow is completed, false otherwise.
     */
    isFlowCompleted(): boolean {
        return this.nextStateHandler instanceof SignInContinuationHandler;
    }
}

/*
 * Result of a sign-up operation that requires a code.
 */
export class SignUpSubmitCodeResult extends SignUpResult {}

/*
 * Result of a sign-up operation that requires a password.
 */
export class SignUpSubmitPasswordResult extends SignUpResult {}

/*
 * Result of a sign-up operation that requires attributes.
 */
export class SignUpSubmitAttributesResult extends SignUpResult {}

/*
 * Result of resending code in a sign-up operation.
 */
export class SignUpResendCodeResult extends ResultBase<
    void,
    SignUpCodeRequiredHandler
> {}
