/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { UserAccountAttributes } from "./UserAccountAttributes.js";

export type GetAccountOptions = NativeAuthActionOptions;

export type SignInOptions = NativeAuthActionOptions & {
    username: string;
    password?: string;
    scopes?: Array<string>;
};

export type SignUpOptions = NativeAuthActionOptions & {
    username: string;
    password?: string;
    attribute?: UserAccountAttributes;
};

export type ResetPasswordOptions = NativeAuthActionOptions & {
    username: string;
};

export type NativeAuthActionOptions = {
    correlationId?: string;
};
