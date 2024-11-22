/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { AuthenticationResult } from "@azure/msal-browser";
import { ResultBase } from "./ResultBase.js";
import { GetAccessTokenState } from "./AuthFlowState.js";

/*
 * Result of getting an access token.
 */
export class GetAccessTokenResult extends ResultBase<
    GetAccessTokenState,
    AuthenticationResult
> {
    constructor(resultData?: AuthenticationResult) {
        super(resultData);
    }

    get state(): GetAccessTokenState {
        if (this.error) {
            return GetAccessTokenState.Failed;
        }

        if (this.data) {
            return GetAccessTokenState.Completed;
        }

        return GetAccessTokenState.Unknown;
    }
}
