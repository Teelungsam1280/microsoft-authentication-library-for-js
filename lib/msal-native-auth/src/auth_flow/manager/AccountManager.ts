/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { NativeAuthConfiguration } from "../../NativeAuthConfiguration.js";
import { InvalidArgumentError } from "../../error/InvalidArgumentError.js";
import { SignOutResult } from "../result/SignOutResult.js";
import { GetAccessTokenResult } from "../result/GetAccessTokenResult.js";
import {
    GetAccessTokenError,
    InvalidScopes,
} from "../../error/GetAccessTokenError.js";
import { AccountInfo, Constants, TokenClaims } from "@azure/msal-browser";

export class AccountManager {
    constructor(
        private readonly account: AccountInfo,
        private readonly correlationId: string,
        private readonly config: NativeAuthConfiguration
    ) {
        if (!config) {
            throw new InvalidArgumentError("config", correlationId);
        }

        if (!account) {
            throw new InvalidArgumentError("account", correlationId);
        }

        if (!correlationId) {
            throw new InvalidArgumentError("correlationId");
        }
    }

    signOut(): Promise<SignOutResult> {
        throw new Error("Method not implemented.");
    }

    getAccount(): AccountInfo {
        return this.account;
    }

    getIdToken(): string | undefined {
        return this.account.idToken;
    }

    getClaims():
        | (TokenClaims & {
              [key: string]:
                  | string
                  | number
                  | string[]
                  | object
                  | undefined
                  | unknown;
          })
        | undefined {
        return this.account.idTokenClaims;
    }

    getAccessToken(
        forceRefresh: boolean = false,
        scopes?: Array<string>
    ): Promise<GetAccessTokenResult> {
        const newScopes = scopes || [
            Constants.OPENID_SCOPE,
            Constants.PROFILE_SCOPE,
            Constants.OFFLINE_ACCESS_SCOPE,
        ];

        if (newScopes.length === 0) {
            const errorResult = GetAccessTokenResult.createWithError(
                new GetAccessTokenError(
                    InvalidScopes,
                    "Empty scopes",
                    this.correlationId
                )
            );

            return Promise.resolve(errorResult);
        }

        throw new Error(
            `Method not implemented with forceRefresh '${forceRefresh}'.`
        );
    }
}
