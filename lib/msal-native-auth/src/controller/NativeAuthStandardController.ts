/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { FetchClient, StandardController } from "@azure/msal-browser";
import {
    SignInCodeRequiredHandler,
    SignInPasswordRequiredHandler,
} from "../auth_flow/handler/SignInHandler.js";
import { AccountInfo } from "../auth_flow/data/AccountInfo.js";
import { GetAccountResult } from "../auth_flow/result/GetAccountResult.js";
import { ResetPasswordStartResult } from "../auth_flow/result/ResetPasswordResult.js";
import { SignInResult } from "../auth_flow/result/SignInResult.js";
import { SignUpResult } from "../auth_flow/result/SignUpResult.js";
import { InvalidArgumentError } from "../error/InvalidArgumentError.js";
import { UnexpectedError } from "../error/UnexpectedError.js";
import {
    SignInStartParams,
    SignInSubmitPasswordParams,
} from "../interaction_client/parameter/SignInParams.js";
import { SignInWithContinuationTokenResult } from "../interaction_client/result/SignInActionResult.js";
import { SigninClient } from "../interaction_client/SignInClient.js";
import {
    GetAccountOptions,
    SignInOptions,
    SignUpOptions,
    ResetPasswordOptions,
    NativeAuthActionOptions,
} from "../NativeAuthActionOptions.js";
import { NativeAuthConfiguration } from "../NativeAuthConfiguration.js";
import { NativeAuthApiClient } from "../network_client/NativeAuthApiClient.js";
import { SignInCodeSendResponse } from "../network_client/response/SignInResponse.js";
import { NativeAuthOperatingContext } from "../operating_context/NativeAuthOperatingContext.js";
import { INativeAuthStardardController } from "./INativeAuthStandardController.js";

export class NativeAuthStandardController
    extends StandardController
    implements INativeAuthStardardController
{
    private readonly signInClient: SigninClient;
    private readonly nativeAuthConfig: NativeAuthConfiguration;

    constructor(operatingContext: NativeAuthOperatingContext) {
        super(operatingContext);

        this.nativeAuthConfig = operatingContext.getNativeAuthConfig();

        const nativeAuthApiClient = new NativeAuthApiClient(new FetchClient());
        this.signInClient = new SigninClient(nativeAuthApiClient);
        // Create more interaction clients here, such as SignUpClient, ResetPasswordClient, etc.
    }

    async getCurrentAccount(
        getAccountOptions: GetAccountOptions
    ): Promise<GetAccountResult> {
        const correlationId = this.getCorrelationId(getAccountOptions);

        throw new Error(
            `Method not implemented with Parameter ${correlationId}.`
        );
    }

    async signIn(signInOptions: SignInOptions): Promise<SignInResult> {
        const correlationId = this.getCorrelationId(signInOptions);

        if (!signInOptions.username) {
            return Promise.resolve(
                SignInResult.createWithError(
                    new InvalidArgumentError("username", correlationId)
                )
            );
        }

        /*
         * Use the signIn method as an example of how to implement a auth flow action.
         * Please note this is not a working implementation.
         */
        try {
            // The authority URL need to be revisited to ensure it is correct.
            const authorityUrl = this.config.auth.authority;

            // start the signin flow
            const signInStartParams: SignInStartParams = new SignInStartParams(
                authorityUrl,
                this.config.auth.clientId,
                correlationId,
                this.nativeAuthConfig.nativeAuth.challengeTypes ?? [],
                signInOptions.scopes ?? [],
                signInOptions.username,
                signInOptions.password
            );

            const startResult = await this.signInClient.start(
                signInStartParams
            );

            if (startResult instanceof SignInWithContinuationTokenResult) {
                // require password
                if (!signInOptions.password) {
                    return new SignInResult(
                        undefined,
                        new SignInPasswordRequiredHandler(
                            this.signInClient,
                            correlationId,
                            startResult.continuationToken,
                            this.nativeAuthConfig,
                            signInOptions.scopes
                        )
                    );
                }

                // if the password is provided, then try to get token silently.
                const signInSubmitPasswordParams =
                    new SignInSubmitPasswordParams(
                        authorityUrl,
                        this.config.auth.clientId,
                        correlationId,
                        this.nativeAuthConfig.nativeAuth.challengeTypes ?? [],
                        signInOptions.scopes ?? [],
                        startResult.continuationToken,
                        signInOptions.password
                    );

                const completedResult = await this.signInClient.submitPassword(
                    signInSubmitPasswordParams
                );

                const accountManager = new AccountInfo(
                    completedResult.authenticationResult.account,
                    correlationId,
                    this.nativeAuthConfig
                );

                return new SignInResult(accountManager);
            } else if (startResult instanceof SignInCodeSendResponse) {
                // require code
                return new SignInResult(
                    undefined,
                    new SignInCodeRequiredHandler(
                        this.signInClient,
                        correlationId,
                        startResult.continuationToken,
                        this.nativeAuthConfig,
                        signInOptions.scopes
                    )
                );
            } else {
                throw new UnexpectedError("Unknow SignInStartResult type");
            }
        } catch (error) {
            return SignInResult.createWithError(error);
        }
    }

    async signUp(signUpOptions: SignUpOptions): Promise<SignUpResult> {
        const correlationId = this.getCorrelationId(signUpOptions);

        if (!signUpOptions.username) {
            return Promise.resolve(
                SignUpResult.createWithError(
                    new InvalidArgumentError("username", correlationId)
                )
            );
        }

        throw new Error(
            `Method not implemented with Parameter ${correlationId}.`
        );
    }

    async resetPassword(
        resetPasswordOptions: ResetPasswordOptions
    ): Promise<ResetPasswordStartResult> {
        const correlationId = this.getCorrelationId(resetPasswordOptions);

        if (!resetPasswordOptions.username) {
            return Promise.resolve(
                ResetPasswordStartResult.createWithError(
                    new InvalidArgumentError("username", correlationId)
                )
            );
        }

        throw new Error(
            `Method not implemented with Parameter ${correlationId}.`
        );
    }

    private getCorrelationId(actionOptions: NativeAuthActionOptions): string {
        return (
            actionOptions.correlationId || this.browserCrypto.createNewGuid()
        );
    }
}
