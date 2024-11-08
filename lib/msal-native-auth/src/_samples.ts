/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    SignInCodeRequiredHandler,
    SignInPasswordRequiredHandler,
} from "./auth_flow/handler/SignInHandler.js";
import { AccountManager } from "./auth_flow/manager/AccountManager.js";
import { SignInOptions } from "./NativeAuthActionOptions.js";
import { NativeAuthConfiguration } from "./NativeAuthConfiguration.js";
import { NativeAuthPublicClientApplication } from "./NativeAuthPublicClientApplication.js";

export async function signin(): Promise<void> {
    const config: NativeAuthConfiguration = {
        auth: { clientId: "test-client-id" },
        nativeAuth: { challengeTypes: ["test-challenge-type"] },
    };

    const app = NativeAuthPublicClientApplication.create(config);

    const signInOptions: SignInOptions = {
        username: "test-username",
        correlationId: "test-correlation-id",
    };

    const result = await app.signIn(signInOptions);

    if (!result.isSuccess) {
        // handle error

        return;
    }

    // Check if the flow is completed
    if (result.isFlowCompleted()) {
        // Get the account manager which can be used to get account information, tokens, and sign out.
        const accountManager: AccountManager = result.result as AccountManager;

        accountManager.getAccount();
        accountManager.getIdToken();
        await accountManager.getAccessToken();
        await accountManager.signOut();

        return;
    }

    // code required
    if (result.nextStateHandler instanceof SignInCodeRequiredHandler) {
        // collect code from customer.
        const code = "test-code";

        const submitCodeResult = await result.nextStateHandler.submitCode(code);

        if (!submitCodeResult.isSuccess) {
            // handle error

            return;
        }

        // Get the account manager which can be used to get account information, tokens, and sign out.
        const accountManager: AccountManager = result.result as AccountManager;

        accountManager.getAccount();
        accountManager.getIdToken();
        await accountManager.getAccessToken();
        await accountManager.signOut();

        return;
    }

    // resend code and submit code
    if (result.nextStateHandler instanceof SignInCodeRequiredHandler) {
        // resend code
        const resendCodeResult = await result.nextStateHandler.resendCode();

        if (!resendCodeResult.isSuccess) {
            // handle error

            return;
        }

        // collect code from customer.
        const code = "test-code";

        const submitCodeResult = await (
            resendCodeResult.nextStateHandler as SignInCodeRequiredHandler
        ).submitCode(code);

        if (!submitCodeResult.isSuccess) {
            // handle error

            return;
        }

        // Get the account manager which can be used to get account information, tokens, and sign out.
        const accountManager: AccountManager = result.result as AccountManager;

        accountManager.getAccount();
        accountManager.getIdToken();
        await accountManager.getAccessToken();
        await accountManager.signOut();

        return;
    }

    // password required
    if (result.nextStateHandler instanceof SignInPasswordRequiredHandler) {
        // collect password from customer.
        const pwd = "test-password";
        const submitPasswordResult =
            await result.nextStateHandler.sumbmitPassword(pwd);

        if (!submitPasswordResult.isSuccess) {
            // handle error

            return;
        }

        // Get the account manager which can be used to get account information, tokens, and sign out.
        const accountManager: AccountManager = result.result as AccountManager;

        accountManager.getAccount();
        accountManager.getIdToken();
        await accountManager.getAccessToken();
        await accountManager.signOut();

        return;
    }
}
