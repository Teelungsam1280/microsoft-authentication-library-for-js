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
    /*
     * Gets the current account from the cache.
     * @param getAccountOptions - Options for getting the current cached account
     * @returns - A promise that resolves to GetAccountResult
     */
    getCurrentAccount(
        getAccountOptions: GetAccountOptions
    ): Promise<GetAccountResult>;

    /*
     * Initiates the sign-in flow.
     * @param signInOptions - Options for the sign-in flow
     * @returns - A promise that resolves to SignInResult
     */
    signIn(signInOptions: SignInOptions): Promise<SignInResult>;

    /*
     * Initiates the sign-up flow.
     * @param signUpOptions - Options for the sign-up flow
     * @returns - A promise that resolves to SignUpResult
     */
    signUp(signUpOptions: SignUpOptions): Promise<SignUpResult>;

    /*
     * Initiates the reset password flow.
     * @param resetPasswordOptions - Options for the reset password flow
     * @returns - A promise that resolves to ResetPasswordStartResult
     */
    resetPassword(
        resetPasswordOptions: ResetPasswordOptions
    ): Promise<ResetPasswordStartResult>;
}
