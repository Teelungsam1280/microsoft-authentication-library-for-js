/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ResultBase } from "./ResultBase.js";

export class SignOutResult extends ResultBase<void, void> {
    isFlowCompleted(): boolean {
        return true;
    }
}
