/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { FetchClient } from "@azure/msal-browser";
import { InvalidArgumentError } from "../error/InvalidArgumentError.js";
import { INativeAuthApiClient } from "./INativeAuthApiClient.js";
import {
    InitiateRequest,
    ChallengeRequest,
    OobTokenRequest,
    PasswordTokenRequest,
    ContinuationTokenRequest,
} from "./request/SignInRequest.js";
import {
    ContinuationTokenResponse,
    CodeSendResponse,
    TokenResponse,
} from "./response/SignInResponse.js";

export class NativeAuthApiClient implements INativeAuthApiClient {
    constructor(private readonly httpClient: FetchClient) {
        if (!httpClient) {
            throw new InvalidArgumentError("httpClient");
        }
    }

    async performInitiateRequest(
        request: InitiateRequest
    ): Promise<ContinuationTokenResponse> {
        /*
         * 1. generate the network request options and request url
         * 2. call httpClient.sendPostRequestAsync to get response
         * 3. if the response is successful, then deserialze the response body to ContinuationTokenResponse.
         * 4. if the response is failed, generate an error based on the error response and throw it.
         */

        throw new Error(`Method not implemented with parameter ${request}`);
    }

    async performChanllegeRequest(
        request: ChallengeRequest
    ): Promise<CodeSendResponse | ContinuationTokenResponse> {
        throw new Error(`Method not implemented with parameter ${request}`);
    }

    async performOobTokenRequest(
        request: OobTokenRequest
    ): Promise<TokenResponse> {
        throw new Error(`Method not implemented with parameter ${request}`);
    }

    async performPasswordTokenRequest(
        request: PasswordTokenRequest
    ): Promise<TokenResponse> {
        throw new Error(`Method not implemented with parameter ${request}`);
    }

    async performConituationTokenTokenRequest(
        request: ContinuationTokenRequest
    ): Promise<TokenResponse> {
        throw new Error(`Method not implemented with parameter ${request}`);
    }
}
