/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    ResetPasswordCodeRequiredStateHandler,
    ResetPasswordPasswordRequiredStateHandler,
} from "../state_handler/ResetPasswordStateHandler.js";
import { ResultBase } from "./ResultBase.js";
import { SignInContinuationStateHandler } from "../state_handler/SignInStateHandler.js";
import { ResetPasswordState } from "./AuthFlowState.js";

/*
 * Result of a reset password operation.
 */
export class ResetPasswordStartResult extends ResultBase<
    ResetPasswordState,
    void,
    ResetPasswordCodeRequiredStateHandler
> {
    constructor(stateHandler?: ResetPasswordCodeRequiredStateHandler) {
        super(undefined, stateHandler);
    }

    get state(): ResetPasswordState {
        if (this.error) {
            return ResetPasswordState.Failed;
        }

        if (this.stateHandler) {
            return ResetPasswordState.CodeRequired;
        }

        return ResetPasswordState.Unknown;
    }
}

/*
 * Result of a reset password operation that requires a code.
 */
export class ResetPasswordSubmitCodeResult extends ResultBase<
    ResetPasswordState,
    void,
    ResetPasswordPasswordRequiredStateHandler
> {
    constructor(stateHandler?: ResetPasswordPasswordRequiredStateHandler) {
        super(undefined, stateHandler);
    }

    get state(): ResetPasswordState {
        if (this.error) {
            return ResetPasswordState.Failed;
        }

        if (this.stateHandler) {
            return ResetPasswordState.PasswordRequired;
        }

        return ResetPasswordState.Unknown;
    }
}

/*
 * Result of a reset password operation that requires a password.
 */
export class ResetPasswordSubmitPasswordResult extends ResultBase<
    ResetPasswordState,
    void,
    SignInContinuationStateHandler
> {
    constructor(stateHandler?: SignInContinuationStateHandler) {
        super(undefined, stateHandler);
    }

    get state(): ResetPasswordState {
        if (this.error) {
            return ResetPasswordState.Failed;
        }

        if (this.stateHandler) {
            return ResetPasswordState.Completed;
        }

        return ResetPasswordState.Unknown;
    }
}

/*
 * Result of resending code in a reset password operation.
 */
export class ResetPasswordResendCodeResult extends ResultBase<
    ResetPasswordState,
    void,
    ResetPasswordCodeRequiredStateHandler
> {
    constructor(stateHandler?: ResetPasswordCodeRequiredStateHandler) {
        super(undefined, stateHandler);
    }

    get state(): ResetPasswordState {
        if (this.error) {
            return ResetPasswordState.Failed;
        }

        if (this.stateHandler) {
            return ResetPasswordState.CodeRequired;
        }

        return ResetPasswordState.Unknown;
    }
}
