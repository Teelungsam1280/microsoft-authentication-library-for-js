/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ResultBase } from "./ResultBase.js";

/*
 * Result of a sign-out operation.
 */
export class SignOutResult extends ResultBase<void, void> {
    /*
     * Checks if the flow is completed.
     * @returns True if the flow is completed, false otherwise.
     */
    isFlowCompleted(): boolean {
        return true;
    }
}
