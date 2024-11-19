/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { IController } from "@azure/msal-browser";
import { GetAccountResult } from "../auth_flow/result/GetAccountResult.js";
import { ResetPasswordStartResult } from "../auth_flow/result/ResetPasswordResult.js";
import { SignInResult } from "../auth_flow/result/SignInResult.js";
import { SignUpResult } from "../auth_flow/result/SignUpResult.js";
import {
    GetAccountInputs,
    ResetPasswordInputs,
    SignInInputs,
    SignUpInputs,
} from "../NativeAuthActionInputs.js";

/*
 * Controller interface for standard authentication operations.
 */
export interface INativeAuthStardardController extends IController {
    /*
     * Gets the current account from the cache.
     * @param getAccountOptions - Options for getting the current cached account
     * @returns - A promise that resolves to GetAccountResult
     */
    getCurrentAccount(
        getAccountOptions: GetAccountInputs
    ): Promise<GetAccountResult>;

    /*
     * Signs the current user out.
     * @param signInOptions - Options for signing in.
     * @returns The result of the operation.
     */
    signIn(signInOptions: SignInInputs): Promise<SignInResult>;

    /*
     * Signs the current user up.
     * @param signUpOptions - Options for signing up.
     * @returns The result of the operation.
     */
    signUp(signUpOptions: SignUpInputs): Promise<SignUpResult>;

    /*
     * Resets the password for the current user.
     * @param resetPasswordOptions - Options for resetting the password.
     * @returns The result of the operation.
     */
    resetPassword(
        resetPasswordOptions: ResetPasswordInputs
    ): Promise<ResetPasswordStartResult>;
}
