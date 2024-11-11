/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { AccountInfo } from "../data/AccountInfo.js";
import { ResultBase } from "./ResultBase.js";

/*
 * Result of getting an account.
 */
export class GetAccountResult extends ResultBase<AccountInfo> {}
