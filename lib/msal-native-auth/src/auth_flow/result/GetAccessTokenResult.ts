/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { AuthenticationResult } from "@azure/msal-browser";
import { ResultBase } from "./ResultBase.js";

export class GetAccessTokenResult extends ResultBase<AuthenticationResult> {}
