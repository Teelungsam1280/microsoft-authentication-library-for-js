/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    ChallengeRequest,
    ContinuationTokenRequest,
    InitiateRequest,
    OobTokenRequest,
    PasswordTokenRequest,
} from "./request/SignInRequest.js";
import {
    CodeSendResponse,
    ContinuationTokenResponse,
    TokenResponse,
} from "./response/SignInResponse.js";

export interface INativeAuthApiClient {
    performInitiateRequest(
        request: InitiateRequest
    ): Promise<ContinuationTokenResponse>;

    performChanllegeRequest(
        request: ChallengeRequest
    ): Promise<CodeSendResponse | ContinuationTokenResponse>;

    performOobTokenRequest(request: OobTokenRequest): Promise<TokenResponse>;

    performPasswordTokenRequest(
        request: PasswordTokenRequest
    ): Promise<TokenResponse>;

    performConituationTokenTokenRequest(
        request: ContinuationTokenRequest
    ): Promise<TokenResponse>;
}
