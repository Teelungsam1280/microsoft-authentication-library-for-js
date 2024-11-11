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
import { HandlerBase } from "./HandlerBase.js";

/*
 * Base handler for sign-up flow.
 */
abstract class SignUpHandler extends HandlerBase {
    /*
     * Creates a new SignUpHandler.
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
 * Handler for sign-up operations that require a code.
 */
export class SignUpCodeRequiredHandler extends SignUpHandler {
    /*
     * Submits a code for sign-up.
     * @param code - The code to submit.
     * @returns The result of the operation.
     */
    submitCode(code: string): Promise<SignUpSubmitCodeResult> {
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
    resendCode(): Promise<SignUpResendCodeResult> {
        throw new Error("Method not implemented.");
    }
}

/*
 * Handler for sign-up operations that require a password.
 */
export class SignUpPasswordRequiredHandler extends SignUpHandler {
    /*
     * Submits a password for sign-up.
     * @param password - The password to submit.
     * @returns The result of the operation.
     */
    sumbmitPassword(password: string): Promise<SignUpSubmitPasswordResult> {
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
 * Handler for sign-up operations that require attributes.
 */
export class SignUpAttributesRequiredHandler extends SignUpHandler {
    /*
     * Submits attributes for sign-up.
     * @param attributes - The attributes to submit.
     * @returns The result of the operation.
     */
    sumbmitAttributes(
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
