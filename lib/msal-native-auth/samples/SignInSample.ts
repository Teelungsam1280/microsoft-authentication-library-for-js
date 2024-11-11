/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    SignInCodeRequiredHandler,
    SignInPasswordRequiredHandler,
    UserNotFoundError,
} from "@azure/msal-native-auth";
import { AccountInfo } from "@azure/msal-native-auth";
import { SignInOptions } from "@azure/msal-native-auth";
import { NativeAuthConfiguration } from "@azure/msal-native-auth";
import { NativeAuthPublicClientApplication } from "@azure/msal-native-auth";

// This sample demonstrates how to sign in a user using the MSAL Native Auth library.
// Currently, this sample doesn't work and only is used to demonstrate the usage of the library.
export async function signin(
    username: string,
    password?: string
): Promise<void> {
    const config: NativeAuthConfiguration = {
        auth: { clientId: "test-client-id" },
        nativeAuth: { challengeTypes: ["test-challenge-type"] },
    };

    const app = NativeAuthPublicClientApplication.create(config);

    const signInOptions: SignInOptions = {
        username: username,
        password: password,
    };

    const result = await app.signIn(signInOptions);

    if (!result.isSuccess) {
        // check the errr type and handle error

        if (result.error instanceof UserNotFoundError) {
            // handle user not found error
        } else {
            // handle unexpected error
        }

        return;
    }

    // Check if the flow is completed
    if (result.isFlowCompleted()) {
        // Get the account info which can be used to get account data, tokens, and sign out.
        const accountManager: AccountInfo = result.resultData as AccountInfo;

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
        const accountManager: AccountInfo =
            submitCodeResult.resultData as AccountInfo;

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
        const accountManager: AccountInfo =
            submitCodeResult.resultData as AccountInfo;

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
        const accountManager: AccountInfo =
            submitPasswordResult.resultData as AccountInfo;

        accountManager.getAccount();
        accountManager.getIdToken();
        await accountManager.getAccessToken();
        await accountManager.signOut();

        return;
    }
}

console.log("Starting sign in sample...");
