import {fetchAuthSession, getCurrentUser, signOut} from "aws-amplify/auth";

export async function currentSession() {
    try {
        console.log("fetching access token")
        const { accessToken } = (await fetchAuthSession()).tokens ?? {};
        console.log("accessToken");
        console.log(accessToken.toString());
        return accessToken;
    } catch (err) {
        console.log(err);
    }
}

export async function handleSignOut() {
    try {
        await signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}