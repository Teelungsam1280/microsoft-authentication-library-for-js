/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { InvalidArgumentError } from "../error/InvalidArgumentError.js";
import { RedirectError, UnknownApiError } from "../error/NativeAuthApiError.js";
import { ChallengeTypeConstants } from "../NativeAuthConstants.js";
import { INativeAuthApiClient } from "../network_client/INativeAuthApiClient.js";
import {
    ChallengeRequest,
    InitiateRequest,
} from "../network_client/request/SignInRequest.js";
import {
    CodeSendResponse,
    ContinuationTokenResponse,
} from "../network_client/response/SignInResponse.js";
import { InteractionClientBase } from "./InteractionClientBase.js";
import {
    SignInContinuationTokenParams,
    SignInStartParams,
    SignInResendCodeParams,
    SignInSubmitCodeParams,
    SignInSubmitPasswordParams,
} from "./parameter/SignInParams.js";
import {
    SignInCodeSendResult,
    SignInCompleteResult,
    SignInWithContinuationTokenResult,
} from "./result/SignInActionResult.js";

export class SigninClient extends InteractionClientBase {
    constructor(public nativeAuthApiClient: INativeAuthApiClient) {
        super();

        if (!nativeAuthApiClient) {
            throw new InvalidArgumentError("nativeAuthApiClient");
        }
    }

    async start(
        parameters: SignInStartParams
    ): Promise<SignInWithContinuationTokenResult | SignInCodeSendResult> {
        /*
         * Using the nativeAuthApiClient to make the requests to start the signin flow.
         * Based on the response, we will return the appropriate result for the different.
         * The followings are just some sample codes to demonstrate how to use the nativeAuthApiClient.
         */

        const initiateRequest = InitiateRequest.create(parameters);

        // There is no need to catch the error here. If an error is thrown, it should be caught by the caller.
        const initiateResponse =
            await this.nativeAuthApiClient.performInitiateRequest(
                initiateRequest
            );

        if (
            initiateResponse.challengeType === ChallengeTypeConstants.REDIRECT
        ) {
            throw new RedirectError(parameters.correlationId);
        }

        const continuationToken: string =
            initiateResponse.continuationToken || "";

        if (!continuationToken) {
            throw new UnknownApiError(
                "Unknown",
                "Cannot find continuation token in the response.",
                parameters.correlationId,
                []
            );
        }

        // Create challenge request.
        const challengeRequest = ChallengeRequest.create(
            parameters,
            continuationToken
        );

        // Call challenge endpoint.
        const challengeResponse =
            await this.nativeAuthApiClient.performChanllegeRequest(
                challengeRequest
            );

        if (
            initiateResponse.challengeType === ChallengeTypeConstants.REDIRECT
        ) {
            throw new RedirectError(parameters.correlationId);
        }

        if (
            challengeResponse instanceof ContinuationTokenResponse &&
            challengeResponse.challengeType === ChallengeTypeConstants.PASSWORD
        ) {
            // Password is required
            return new SignInWithContinuationTokenResult(
                challengeResponse.continuationToken ?? "",
                parameters.correlationId,
                challengeResponse.challengeType
            );
        } else if (
            challengeResponse instanceof CodeSendResponse &&
            challengeResponse.challengeType === ChallengeTypeConstants.OOB
        ) {
            /*
             * Code is required
             * Need to verify the response and return the correct result.
             */
            return new SignInCodeSendResult(
                challengeResponse.continuationToken ?? "",
                challengeResponse.challengeType ?? "",
                challengeResponse.challengeChannel ?? "",
                challengeResponse.challengeTargetLabel ?? "",
                challengeResponse.codeLength ?? 0,
                parameters.correlationId
            );
        } else {
            throw new UnknownApiError(
                "Unknown",
                "Unexpected response returned from challenge endpoint.",
                parameters.correlationId,
                []
            );
        }
    }

    async submitCode(
        parameters: SignInSubmitCodeParams
    ): Promise<SignInCompleteResult> {
        throw new Error(`Method not implemented with Parameter ${parameters}.`);
    }

    async submitPassword(
        parameters: SignInSubmitPasswordParams
    ): Promise<SignInCompleteResult> {
        throw new Error(`Method not implemented with Parameter ${parameters}.`);
    }

    async resendCode(
        parameters: SignInResendCodeParams
    ): Promise<SignInCodeSendResult> {
        throw new Error(`Method not implemented with Parameter ${parameters}.`);
    }

    async signInWithContinuationToken(
        parameters: SignInContinuationTokenParams
    ): Promise<SignInWithContinuationTokenResult> {
        throw new Error(`Method not implemented with Parameter ${parameters}.`);
    }
}
