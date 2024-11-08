/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    SignInCodeRequiredHandler,
    SignInPasswordRequiredHandler,
} from "../handler/SignInHandler.js";
import { AccountManager } from "../manager/AccountManager.js";
import { ResultBase } from "./ResultBase.js";

export class SignInResult extends ResultBase<
    AccountManager,
    SignInCodeRequiredHandler | SignInPasswordRequiredHandler
> {
    constructor(
        result?: AccountManager,
        handler?: SignInCodeRequiredHandler | SignInPasswordRequiredHandler
    ) {
        super();
        this.result = result;
        this.nextStateHandler = handler;
    }
}

export class SignInSubmitCodeResult extends ResultBase<AccountManager> {
    constructor(result?: AccountManager) {
        super();
        this.result = result;
    }
}

export class SignInSubmitPasswordResult extends ResultBase<AccountManager> {}

export class SignInResendCodeResult extends ResultBase<
    void,
    SignInCodeRequiredHandler
> {}
