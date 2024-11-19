/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { InvalidArgumentError } from "../../error/InvalidArgumentError.js";

export abstract class AuthFlowStateBase {
    protected constructor(
        protected correlationId: string,
        protected continuationToken?: string
    ) {
        if (!correlationId) {
            throw new InvalidArgumentError("correlationId");
        }
    }
}
