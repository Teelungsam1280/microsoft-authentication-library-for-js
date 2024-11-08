/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { InvalidArgumentError } from "../../error/InvalidArgumentError.js";
import { SignInSubmitCodeParams } from "../../interaction_client/parameter/SignInParams.js";
import { SigninClient } from "../../interaction_client/SignInClient.js";
import { NativeAuthConfiguration } from "../../NativeAuthConfiguration.js";
import { AccountManager } from "../manager/AccountManager.js";
import {
    SignInResendCodeResult,
    SignInResult,
    SignInSubmitCodeResult,
    SignInSubmitPasswordResult,
} from "../result/SignInResult.js";
import { HandlerBase } from "./HandlerBase.js";

abstract class SignInHandler extends HandlerBase {
    constructor(
        protected signInClient: SigninClient,
        correlationId: string,
        continuationToken: string,
        protected config: NativeAuthConfiguration,
        protected scopes?: Array<string>
    ) {
        super(correlationId, continuationToken);

        if (!continuationToken) {
            throw new InvalidArgumentError("continuationToken", correlationId);
        }

        if (!config) {
            throw new InvalidArgumentError("config", correlationId);
        }

        if (!signInClient) {
            throw new InvalidArgumentError("signInClient", correlationId);
        }
    }
}

export class SignInCodeRequiredHandler extends SignInHandler {
    async submitCode(code: string): Promise<SignInSubmitCodeResult> {
        if (!code) {
            const result = SignInSubmitCodeResult.createWithError(
                new InvalidArgumentError("code", this.correlationId)
            );

            return Promise.resolve(result);
        }

        try {
            // The followings are the sample codes used to demonstrate how to use the signInClient to implement submitting code.
            const submitCodeParams = new SignInSubmitCodeParams(
                this.config.auth.authority ?? "",
                this.config.auth.clientId,
                this.correlationId,
                this.config.nativeAuth.challengeTypes ?? [],
                this.scopes ?? [],
                this.continuationToken ?? "",
                code
            );

            const completedResult = await this.signInClient.submitCode(
                submitCodeParams
            );

            const accountManager = new AccountManager(
                completedResult.authenticationResult.account,
                this.correlationId,
                this.config
            );

            return new SignInSubmitCodeResult(accountManager);
        } catch (error) {
            return SignInSubmitCodeResult.createWithError(error);
        }
    }

    async resendCode(): Promise<SignInResendCodeResult> {
        throw new Error("Method not implemented.");
    }
}

export class SignInPasswordRequiredHandler extends SignInHandler {
    async sumbmitPassword(
        password: string
    ): Promise<SignInSubmitPasswordResult> {
        if (!password) {
            const result = SignInSubmitPasswordResult.createWithError(
                new InvalidArgumentError("password", this.correlationId)
            );

            return Promise.resolve(result);
        }

        throw new Error("Method not implemented.");
    }
}

export class SignInContinuationHandler extends HandlerBase {
    constructor(
        correlationId: string,
        continuationToken: string,
        private config: NativeAuthConfiguration,
        private username: string
    ) {
        super(correlationId, continuationToken);

        if (!continuationToken) {
            throw new InvalidArgumentError("continuationToken", correlationId);
        }

        if (!config) {
            throw new InvalidArgumentError("config", correlationId);
        }

        if (!username) {
            throw new InvalidArgumentError("username", correlationId);
        }
    }

    signIn(scopes?: Array<string>): Promise<SignInResult> {
        throw new Error(`Method not implemented with parameter: ${scopes}`);
    }
}
