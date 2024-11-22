/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    SignUpAttributesRequiredStateHandler,
    SignUpCodeRequiredStateHandler,
    SignUpPasswordRequiredStateHandler,
} from "../state_handler/SignUpStateHandler.js";
import { ResultBase } from "./ResultBase.js";
import { SignInContinuationStateHandler } from "../state_handler/SignInStateHandler.js";
import { SignUpState } from "./AuthFlowState.js";

/*
 * Result of a sign-up operation.
 */
export class SignUpResult extends ResultBase<
    SignUpState,
    void,
    | SignUpCodeRequiredStateHandler
    | SignUpPasswordRequiredStateHandler
    | SignUpAttributesRequiredStateHandler
    | SignInContinuationStateHandler
> {
    constructor(
        stateHandler?:
            | SignUpCodeRequiredStateHandler
            | SignUpPasswordRequiredStateHandler
            | SignUpAttributesRequiredStateHandler
            | SignInContinuationStateHandler
    ) {
        super(undefined, stateHandler);

        if (this.stateHandler instanceof SignUpCodeRequiredStateHandler) {
            this._state = SignUpState.CodeRequired;
        } else if (
            this.stateHandler instanceof SignUpPasswordRequiredStateHandler
        ) {
            this._state = SignUpState.PasswordRequired;
        } else if (
            this.stateHandler instanceof SignUpAttributesRequiredStateHandler
        ) {
            this._state = SignUpState.AttributesRequired;
        } else if (
            this.stateHandler instanceof SignInContinuationStateHandler
        ) {
            this._state = SignUpState.Completed;
        }
    }

    get state(): SignUpState {
        if (this.error) {
            return SignUpState.Failed;
        }

        if (this._state) {
            return this._state;
        }

        return SignUpState.Unknown;
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
    SignUpState,
    void,
    SignUpCodeRequiredStateHandler
> {
    constructor(stateHandler?: SignUpCodeRequiredStateHandler) {
        super(undefined, stateHandler);
    }

    get state(): SignUpState {
        if (this.error) {
            return SignUpState.Failed;
        }

        if (this.stateHandler) {
            return SignUpState.CodeRequired;
        }

        return SignUpState.Unknown;
    }
}
