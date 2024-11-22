/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { InvalidArgumentError } from "../../error/InvalidArgumentError.js";
import { NativeAuthConfiguration } from "../../NativeAuthConfiguration.js";
import { UserAccountAttributes } from "../../UserAccountAttributes.js";
import {
    SignUpResendCodeResult,
    SignUpSubmitAttributesResult,
    SignUpSubmitCodeResult,
    SignUpSubmitPasswordResult,
} from "../result/SignUpResult.js";
import { AuthFlowStateHandlerBase } from "./AuthFlowStateHandlerBase.js";

/*
 * Base state handler for sign-up flow.
 */
abstract class SignUpStateHandler extends AuthFlowStateHandlerBase {
    /*
     * Creates a new SignUpStateHandler.
     * @param correlationId - The correlation ID for the request.
     * @param continuationToken - The continuation token for the request.
     * @param config - The configuration for the request.
     * @param username - The username for the request.
     */
    constructor(
        correlationId: string,
        continuationToken: string,
        protected config: NativeAuthConfiguration,
        protected username: string
    ) {
        super(correlationId, continuationToken);

        if (!config) {
            throw new InvalidArgumentError("config", correlationId);
        }

        if (!username) {
            throw new InvalidArgumentError("username", correlationId);
        }
    }
}

/*
 * Sign-up handler used for the state of code required.
 */
export class SignUpCodeRequiredStateHandler extends SignUpStateHandler {
    /*
     * Submits a code for sign-up.
     * @param code - The code to submit.
     * @returns The result of the operation.
     */
    async submitCode(code: string): Promise<SignUpSubmitCodeResult> {
        if (!code) {
            return Promise.resolve(
                SignUpSubmitCodeResult.createWithError(
                    new InvalidArgumentError("code", this.correlationId)
                )
            );
        }

        throw new Error("Method not implemented.");
    }

    /*
     * Resends a code for sign-up.
     * @returns The result of the operation.
     */
    async resendCode(): Promise<SignUpResendCodeResult> {
        throw new Error("Method not implemented.");
    }
}

/*
 * Sign-up handler used for the state of password required.
 */
export class SignUpPasswordRequiredStateHandler extends SignUpStateHandler {
    /*
     * Submits a password for sign-up.
     * @param password - The password to submit.
     * @returns The result of the operation.
     */
    async sumbmitPassword(
        password: string
    ): Promise<SignUpSubmitPasswordResult> {
        if (!password) {
            return Promise.resolve(
                SignUpSubmitPasswordResult.createWithError(
                    new InvalidArgumentError("password", this.correlationId)
                )
            );
        }

        throw new Error("Method not implemented.");
    }
}

/*
 * Sign-up handler used for the state of attributes required.
 */
export class SignUpAttributesRequiredStateHandler extends SignUpStateHandler {
    /*
     * Submits attributes for sign-up.
     * @param attributes - The attributes to submit.
     * @returns The result of the operation.
     */
    async sumbmitAttributes(
        attributes: UserAccountAttributes
    ): Promise<SignUpSubmitAttributesResult> {
        if (!attributes) {
            return Promise.resolve(
                SignUpSubmitAttributesResult.createWithError(
                    new InvalidArgumentError("attributes", this.correlationId)
                )
            );
        }

        throw new Error("Method not implemented.");
    }
}
