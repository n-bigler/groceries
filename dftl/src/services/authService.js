import {fetchAuthSession, signOut} from "aws-amplify/auth";

export async function currentSession() {
    try {
        // const session = await fetchAuthSession({ forceRefresh: true });
        // console.log(session);
        const { accessToken } = (await fetchAuthSession()).tokens ?? {};
        // console.log(refreshToken);
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