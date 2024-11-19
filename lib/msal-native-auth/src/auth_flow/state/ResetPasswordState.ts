/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { InvalidArgumentError } from "../../error/InvalidArgumentError.js";
import { NativeAuthConfiguration } from "../../NativeAuthConfiguration.js";
import {
    ResetPasswordResendCodeResult,
    ResetPasswordSubmitCodeResult,
    ResetPasswordSubmitPasswordResult,
} from "../result/ResetPasswordResult.js";
import { AuthFlowStateBase } from "./AuthFlowStateBase.js";

/*
 * Base state for reset password operation.
 */
abstract class ResetPasswordState extends AuthFlowStateBase {
    /*
     * Creates a new state for reset password operation.
     * @param correlationId - The correlationId for the request.
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
 * Reset password state that requires a code.
 */
export class ResetPasswordCodeRequiredState extends ResetPasswordState {
    /*
     * Submits a code for reset password.
     * @param code - The code to submit.
     * @returns The result of the operation.
     */
    submitCode(code: string): Promise<ResetPasswordSubmitCodeResult> {
        if (!code) {
            return Promise.resolve(
                ResetPasswordSubmitCodeResult.createWithError(
                    new InvalidArgumentError("code", this.correlationId)
                )
            );
        }

        throw new Error("Method not implemented.");
    }

    /*
     * Resends a code for reset password.
     * @returns The result of the operation.
     */
    resendCode(): Promise<ResetPasswordResendCodeResult> {
        throw new Error("Method not implemented.");
    }
}

/*
 * Reset password state that requires a password.
 */
export class ResetPasswordPasswordRequiredState extends ResetPasswordState {
    /*
     * Submits a password for reset password.
     * @param password - The password to submit.
     * @returns The result of the operation.
     */
    sumbmitPassword(
        password: string
    ): Promise<ResetPasswordSubmitPasswordResult> {
        if (!password) {
            return Promise.resolve(
                ResetPasswordSubmitPasswordResult.createWithError(
                    new InvalidArgumentError("password", this.correlationId)
                )
            );
        }

        throw new Error("Method not implemented.");
    }
}
