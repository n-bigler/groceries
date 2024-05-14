import {fetchAuthSession, getCurrentUser, signOut} from "aws-amplify/auth";

export async function currentAuthenticatedUser() {
    try {
        const {username, userId, signInDetails} = await getCurrentUser();
        console.log(`The username: ${username}`);
        console.log(`The userId: ${userId}`);
        console.log(`The signInDetails: ${signInDetails}`);
    } catch (err) {
        console.log(err);
    }
}
export async function currentSession() {
    try {
        console.log("fetching access token")
        const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
        console.log(idToken)
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