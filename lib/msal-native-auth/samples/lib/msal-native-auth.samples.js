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
    // Currently, this sample doesn't work and is only used to demonstrate the usage of the library.
    async function signin(username, password) {
        const config = {
            auth: { clientId: "test-client-id" },
            nativeAuth: { challengeTypes: ["test-challenge-type"] },
        };
        const app = msalNativeAuth.NativeAuthPublicClientApplication.create(config);
        const signInInputs = {
            username: username,
        };
        const result = await app.signIn(signInInputs);
        switch (result.state) {
            case msalNativeAuth.SignInState.Completed:
                // read the account info from result by result.data and use it to get account data, tokens, and sign out.
                return;
            case msalNativeAuth.SignInState.CodeRequired:
                // collect code from customer.
                const code = "test-code";
                const submitCodeResult = await result.stateHandler.submitCode(code);
                switch (submitCodeResult.state) {
                    case msalNativeAuth.SignInState.Completed:
                        // read the account info from result by submitCodeResult.data and use it to get account data, tokens, and sign out.
                        return;
                    case msalNativeAuth.SignInState.Failed:
                        // check the error type by calling result.error and handle error
                        break;
                    default:
                        throw new Error("Invalid sign in state");
                }
            case msalNativeAuth.SignInState.PasswordRequired:
                // collect password from customer.
                const password = "test-pwd";
                const submitPasswordResult = await result.stateHandler.sumbmitPassword(password);
                switch (submitPasswordResult.state) {
                    case msalNativeAuth.SignInState.Completed:
                        // read the account info from result by submitPasswordResult.data and use it to get account data, tokens, and sign out.
                        return;
                    case msalNativeAuth.SignInState.Failed:
                        // check the error type by calling result.error and handle error
                        break;
                    default:
                        throw new Error("Invalid sign in state");
                }
            case msalNativeAuth.SignInState.Failed:
                // check the error type by calling result.error and handle error
                return;
            default:
                throw new Error("Invalid sign in state");
        }
    }

    async function test_signin() {
        signin("test-username");
    }
    test_signin();

    exports.test_signin = test_signin;

}));
