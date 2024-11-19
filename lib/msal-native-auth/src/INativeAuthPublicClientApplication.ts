/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { GetAccountResult } from "./auth_flow/result/GetAccountResult.js";
import { ResetPasswordStartResult } from "./auth_flow/result/ResetPasswordResult.js";
import { SignInResult } from "./auth_flow/result/SignInResult.js";
import { SignUpResult } from "./auth_flow/result/SignUpResult.js";
import {
    GetAccountInputs,
    ResetPasswordInputs,
    SignInInputs,
    SignUpInputs,
} from "./NativeAuthActionInputs.js";

export interface INativeAuthPublicClientApplication {
    /*
     * Gets the current account from the cache.
     * @param getAccountInputss - Inputss for getting the current cached account
     * @returns - A promise that resolves to GetAccountResult
     */
    getCurrentAccount(
        getAccountInputss: GetAccountInputs
    ): Promise<GetAccountResult>;

    /*
     * Initiates the sign-in flow.
     * @param signInInputss - Inputss for the sign-in flow
     * @returns - A promise that resolves to SignInResult
     */
    signIn(signInInputss: SignInInputs): Promise<SignInResult>;

    /*
     * Initiates the sign-up flow.
     * @param signUpInputss - Inputss for the sign-up flow
     * @returns - A promise that resolves to SignUpResult
     */
    signUp(signUpInputss: SignUpInputs): Promise<SignUpResult>;

    /*
     * Initiates the reset password flow.
     * @param resetPasswordInputss - Inputss for the reset password flow
     * @returns - A promise that resolves to ResetPasswordStartResult
     */
    resetPassword(
        resetPasswordInputss: ResetPasswordInputs
    ): Promise<ResetPasswordStartResult>;
}
