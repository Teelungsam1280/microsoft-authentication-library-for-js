/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { GetAccountResult } from "./auth_flow/result/GetAccountResult.js";
import { ResetPasswordStartResult } from "./auth_flow/result/ResetPasswordResult.js";
import { SignInResult } from "./auth_flow/result/SignInResult.js";
import { SignUpResult } from "./auth_flow/result/SignUpResult.js";
import {
    GetAccountOptions,
    ResetPasswordOptions,
    SignInOptions,
    SignUpOptions,
} from "./NativeAuthActionOptions.js";

export interface INativeAuthPublicClientApplication {
    getCurrentAccount(
        getAccountOptions: GetAccountOptions
    ): Promise<GetAccountResult>;

    signIn(signInOptions: SignInOptions): Promise<SignInResult>;

    signUp(signUpOptions: SignUpOptions): Promise<SignUpResult>;

    resetPassword(
        resetPasswordOptions: ResetPasswordOptions
    ): Promise<ResetPasswordStartResult>;
}
