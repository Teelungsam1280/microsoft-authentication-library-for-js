/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { PublicClientApplication } from "@azure/msal-browser";
import { GetAccountResult } from "./auth_flow/result/GetAccountResult.js";
import { ResetPasswordStartResult } from "./auth_flow/result/ResetPasswordResult.js";
import { SignInResult } from "./auth_flow/result/SignInResult.js";
import { SignUpResult } from "./auth_flow/result/SignUpResult.js";
import { INativeAuthStardardController } from "./controller/INativeAuthStandardController.js";
import { NativeAuthStandardController } from "./controller/NativeAuthStandardController.js";
import { INativeAuthPublicClientApplication } from "./INativeAuthPublicClientApplication.js";
import {
    GetAccountOptions,
    SignInOptions,
    SignUpOptions,
    ResetPasswordOptions,
} from "./NativeAuthActionOptions.js";
import { NativeAuthConfiguration } from "./NativeAuthConfiguration.js";
import { NativeAuthOperatingContext } from "./operating_context/NativeAuthOperatingContext.js";

export class NativeAuthPublicClientApplication
    extends PublicClientApplication
    implements INativeAuthPublicClientApplication
{
    private readonly nativeAuthController: NativeAuthStandardController;

    static create(
        config: NativeAuthConfiguration
    ): NativeAuthPublicClientApplication {
        return new NativeAuthPublicClientApplication(config);
    }

    constructor(
        config: NativeAuthConfiguration,
        controller?: INativeAuthStardardController
    ) {
        const nativeAuthController = new NativeAuthStandardController(
            new NativeAuthOperatingContext(config)
        );

        super(config, controller || nativeAuthController);

        this.nativeAuthController = nativeAuthController;
    }

    getCurrentAccount(
        getAccountOptions: GetAccountOptions
    ): Promise<GetAccountResult> {
        throw new Error(
            `Method not implemented with parameter ${getAccountOptions}`
        );
    }

    signIn(signInOptions: SignInOptions): Promise<SignInResult> {
        return this.nativeAuthController.signIn(signInOptions);
    }

    signUp(signUpOptions: SignUpOptions): Promise<SignUpResult> {
        throw new Error(
            `Method not implemented with parameter ${signUpOptions}`
        );
    }

    resetPassword(
        resetPasswordOptions: ResetPasswordOptions
    ): Promise<ResetPasswordStartResult> {
        throw new Error(
            `Method not implemented with parameter ${resetPasswordOptions}`
        );
    }
}
