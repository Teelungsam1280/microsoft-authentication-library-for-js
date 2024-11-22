/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { AccountInfo } from "../data/AccountInfo.js";
import { GetAccountState } from "./AuthFlowState.js";
import { ResultBase } from "./ResultBase.js";

/*
 * Result of getting an account.
 */
export class GetAccountResult extends ResultBase<GetAccountState, AccountInfo> {
    constructor(resultData?: AccountInfo) {
        super(resultData);
    }

    get state(): GetAccountState {
        if (this.error) {
            return GetAccountState.Failed;
        }

        if (this.data) {
            return GetAccountState.Completed;
        }

        return GetAccountState.Unknown;
    }
}
