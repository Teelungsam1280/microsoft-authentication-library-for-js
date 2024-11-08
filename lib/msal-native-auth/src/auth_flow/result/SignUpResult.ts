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

export class SignUpResult extends ResultBase<
    void,
    | SignUpCodeRequiredHandler
    | SignUpPasswordRequiredHandler
    | SignUpAttributesRequiredHandler
    | SignInContinuationHandler
> {
    isFlowCompleted(): boolean {
        return this.nextStateHandler instanceof SignInContinuationHandler;
    }
}

export class SignUpSubmitCodeResult extends SignUpResult {}

export class SignUpSubmitPasswordResult extends SignUpResult {}

export class SignUpSubmitAttributesResult extends SignUpResult {}

export class SignUpResendCodeResult extends ResultBase<
    void,
    SignUpCodeRequiredHandler
> {}
