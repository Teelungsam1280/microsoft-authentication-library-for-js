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

abstract class SignUpHandler extends HandlerBase {
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

export class SignUpCodeRequiredHandler extends SignUpHandler {
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

    resendCode(): Promise<SignUpResendCodeResult> {
        throw new Error("Method not implemented.");
    }
}

export class SignUpPasswordRequiredHandler extends SignUpHandler {
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

export class SignUpAttributesRequiredHandler extends SignUpHandler {
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
