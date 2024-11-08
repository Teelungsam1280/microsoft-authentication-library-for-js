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
import { HandlerBase } from "./HandlerBase.js";

abstract class ResetPasswordHandler extends HandlerBase {
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

export class ResetPasswordCodeRequiredHandler extends ResetPasswordHandler {
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

    resendCode(): Promise<ResetPasswordResendCodeResult> {
        throw new Error("Method not implemented.");
    }
}

export class ResetPasswordPasswordRequiredHandler extends ResetPasswordHandler {
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
