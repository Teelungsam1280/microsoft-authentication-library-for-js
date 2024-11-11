/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { AuthenticationResult } from "@azure/msal-browser";
import { ResultBase } from "./ResultBase.js";

/*
 * Result of getting an access token.
 */
export class GetAccessTokenResult extends ResultBase<AuthenticationResult> {}
