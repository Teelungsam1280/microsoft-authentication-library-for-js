/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    SignInCodeRequiredHandler,
    SignInPasswordRequiredHandler,
} from "../handler/SignInHandler.js";
import { AccountInfo } from "../data/AccountInfo.js";
import { ResultBase } from "./ResultBase.js";

export class SignInResult extends ResultBase<
    AccountInfo,
    SignInCodeRequiredHandler | SignInPasswordRequiredHandler
> {
    constructor(
        result?: AccountInfo,
        handler?: SignInCodeRequiredHandler | SignInPasswordRequiredHandler
    ) {
        super();
        this.resultData = result;
        this.nextStateHandler = handler;
    }
}

export class SignInSubmitCodeResult extends ResultBase<AccountInfo> {
    constructor(result?: AccountInfo) {
        super();
        this.resultData = result;
    }
}

export class SignInSubmitPasswordResult extends ResultBase<AccountInfo> {}

export class SignInResendCodeResult extends ResultBase<
    void,
    SignInCodeRequiredHandler
> {}
