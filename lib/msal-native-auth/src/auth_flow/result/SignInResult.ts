/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    SignInCodeRequiredStateHandler,
    SignInPasswordRequiredStateHandler,
} from "../state_handler/SignInStateHandler.js";
import { AccountInfo } from "../data/AccountInfo.js";
import { ResultBase } from "./ResultBase.js";
import { SignInState } from "./AuthFlowState.js";

/*
 * Result of a sign-in operation.
 */
export class SignInResult extends ResultBase<
    SignInState,
    AccountInfo,
    SignInCodeRequiredStateHandler | SignInPasswordRequiredStateHandler
> {
    constructor(
        resultData?: AccountInfo,
        stateHandler?:
            | SignInCodeRequiredStateHandler
            | SignInPasswordRequiredStateHandler
    ) {
        super(resultData, stateHandler);

        if (this.stateHandler instanceof SignInCodeRequiredStateHandler) {
            this._state = SignInState.CodeRequired;
        } else if (
            this.stateHandler instanceof SignInPasswordRequiredStateHandler
        ) {
            this._state = SignInState.PasswordRequired;
        }
    }

    get state(): SignInState {
        if (this.error) {
            return SignInState.Failed;
        }

        if (this._state) {
            return this._state;
        }

        if (this.data) {
            return SignInState.Completed;
        }

        return SignInState.Unknown;
    }
}

/*
 * Result of a sign-in submit credential operation.
 */
abstract class SignInSubmitCredentialResult extends ResultBase<
    SignInState,
    AccountInfo
> {
    constructor(resultData?: AccountInfo) {
        super(resultData);
    }

    get state(): SignInState {
        if (this.error) {
            return SignInState.Failed;
        }

        if (this.data) {
            return SignInState.Completed;
        }

        return SignInState.Unknown;
    }
}

/*
 * Result of a sign-in submit code operation.
 */
export class SignInSubmitCodeResult extends SignInSubmitCredentialResult {}

/*
 * Result of a sign-in submit password operation.
 */
export class SignInSubmitPasswordResult extends SignInSubmitCredentialResult {}

/*
 * Result of resending code sign-in operation.
 */
export class SignInResendCodeResult extends ResultBase<
    SignInState,
    void,
    SignInCodeRequiredStateHandler
> {
    constructor(stateHandler?: SignInCodeRequiredStateHandler) {
        super(undefined, stateHandler);
    }

    get state(): SignInState {
        if (this.error) {
            return SignInState.Failed;
        }

        if (this.stateHandler) {
            return SignInState.CodeRequired;
        }

        return SignInState.Unknown;
    }
}
