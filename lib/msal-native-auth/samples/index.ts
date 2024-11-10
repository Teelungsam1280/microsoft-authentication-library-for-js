import { signin } from "./SignInSample.js";

export async function test_signin(): Promise<void> {
    signin("test-username", "test-password");
}

test_signin();
