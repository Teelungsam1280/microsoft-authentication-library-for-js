'use strict';
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@azure/msal-native-auth')) :
    typeof define === 'function' && define.amd ? define(['exports', '@azure/msal-native-auth'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.msal = {}, global.msalNativeAuth));
})(this, (function (exports, msalNativeAuth) { 'use strict';

    /*
     * Copyright (c) Microsoft Corporation. All rights reserved.
     * Licensed under the MIT License.
     */
    // This sample demonstrates how to sign in a user using the MSAL Native Auth library.
    // Currently, this sample doesn't work and only is used to demonstrate the usage of the library.
    async function signin(username, password) {
        const config = {
            auth: { clientId: "test-client-id" },
            nativeAuth: { challengeTypes: ["test-challenge-type"] },
        };
        const app = msalNativeAuth.NativeAuthPublicClientApplication.create(config);
        const signInOptions = {
            username: username,
            password: password,
        };
        const result = await app.signIn(signInOptions);
        if (!result.isSuccess) {
            // check the errr type and handle error
            if (result.error instanceof msalNativeAuth.UserNotFoundError) ;
            return;
        }
        // Check if the flow is completed
        if (result.isFlowCompleted()) {
            // Get the account info which can be used to get account data, tokens, and sign out.
            const accountManager = result.resultData;
            accountManager.getAccount();
            accountManager.getIdToken();
            await accountManager.getAccessToken();
            await accountManager.signOut();
            return;
        }
        // code required
        if (result.nextStateHandler instanceof msalNativeAuth.SignInCodeRequiredState) {
            // collect code from customer.
            const code = "test-code";
            const submitCodeResult = await result.nextStateHandler.submitCode(code);
            if (!submitCodeResult.isSuccess) {
                // handle error
                return;
            }
            // Get the account manager which can be used to get account information, tokens, and sign out.
            const accountManager = submitCodeResult.resultData;
            accountManager.getAccount();
            accountManager.getIdToken();
            await accountManager.getAccessToken();
            await accountManager.signOut();
            return;
        }
        // resend code and submit code
        if (result.nextStateHandler instanceof msalNativeAuth.SignInCodeRequiredState) {
            // resend code
            const resendCodeResult = await result.nextStateHandler.resendCode();
            if (!resendCodeResult.isSuccess) {
                // handle error
                return;
            }
            // collect code from customer.
            const code = "test-code";
            const submitCodeResult = await resendCodeResult.nextStateHandler.submitCode(code);
            if (!submitCodeResult.isSuccess) {
                // handle error
                return;
            }
            // Get the account manager which can be used to get account information, tokens, and sign out.
            const accountManager = submitCodeResult.resultData;
            accountManager.getAccount();
            accountManager.getIdToken();
            await accountManager.getAccessToken();
            await accountManager.signOut();
            return;
        }
        // password required
        if (result.nextStateHandler instanceof msalNativeAuth.SignInPasswordRequiredState) {
            // collect password from customer.
            const pwd = "test-password";
            const submitPasswordResult = await result.nextStateHandler.sumbmitPassword(pwd);
            if (!submitPasswordResult.isSuccess) {
                // handle error
                return;
            }
            // Get the account manager which can be used to get account information, tokens, and sign out.
            const accountManager = submitPasswordResult.resultData;
            accountManager.getAccount();
            accountManager.getIdToken();
            await accountManager.getAccessToken();
            await accountManager.signOut();
            return;
        }
    }
    console.log("Starting sign in sample...");

    async function test_signin() {
        signin("test-username", "test-password");
    }
    test_signin();

    exports.test_signin = test_signin;

}));
