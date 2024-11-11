/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { InvalidArgumentError } from "../../error/InvalidArgumentError.js";
import { SignInSubmitCodeParams } from "../../interaction_client/parameter/SignInParams.js";
import { SigninClient } from "../../interaction_client/SignInClient.js";
import { NativeAuthConfiguration } from "../../NativeAuthConfiguration.js";
import { AccountInfo } from "../data/AccountInfo.js";
import {
    SignInResendCodeResult,
    SignInResult,
    SignInSubmitCodeResult,
    SignInSubmitPasswordResult,
} from "../result/SignInResult.js";
import { HandlerBase } from "./HandlerBase.js";

/*
 * Base handler for sign-in operations.
 */
abstract class SignInHandler extends HandlerBase {
    /*
     * Constructor for SignInHandler.
     * @param signInClient - The client to use for sign-in operations.
     * @param correlationId - The correlation ID for the request.
     * @param continuationToken - The continuation token for the sign-in operation.
     * @param config - The configuration for the client.
     * @param scopes - The scopes to request during sign-in.
     */
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

/*
 * Handler for sign-in operations that require a code.
 */
export class SignInCodeRequiredHandler extends SignInHandler {
    /*
     * Submits a code for sign-in.
     * @param code - The code to submit.
     * @returns The result of the operation.
     */
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

            const accountManager = new AccountInfo(
                completedResult.authenticationResult.account,
                this.correlationId,
                this.config
            );

            return new SignInSubmitCodeResult(accountManager);
        } catch (error) {
            return SignInSubmitCodeResult.createWithError(error);
        }
    }

    /*
     * Resends a code for sign-in.
     * @returns The result of the operation.
     */
    async resendCode(): Promise<SignInResendCodeResult> {
        throw new Error("Method not implemented.");
    }
}

/*
 * Handler for sign-in operations that require a password.
 */
export class SignInPasswordRequiredHandler extends SignInHandler {
    /*
     * Submits a password for sign-in.
     * @param password - The password to submit.
     * @returns The result of the operation.
     */
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

/*
 * Handler for sign-in operations that require a continuation token.
 */
export class SignInContinuationHandler extends HandlerBase {
    /*
     * Constructor for SignInContinuationHandler.
     * @param correlationId - The correlation ID for the request.
     * @param continuationToken - The continuation token for the sign-in operation.
     * @param config - The configuration for the client.
     * @param username - The username for the sign-in operation.
     */
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

    /*
     * Initiates the sign-in flow with continuation token.
     * @param scopes - The scopes to request during sign-in.
     * @returns The result of the operation.
     */
    signIn(scopes?: Array<string>): Promise<SignInResult> {
        throw new Error(`Method not implemented with parameter: ${scopes}`);
    }
}
