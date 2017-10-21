export const config = {
    loginCookieName: 'prello-auth',
    loginDefaultRedirect: '/overview',

    github: {
        clientID: process.env.GITHUB_CLIENT_ID || '8515ee45647519a537bd',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '9399ae2120cab4a95d1890de32a8c64ab82dc19a',
        callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:8000/github/callback',
        userAgent: process.env.GITHUB_USER_AGENT || 'Prello-dev'
    }
}
