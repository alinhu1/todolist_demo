export const logtoConfig = {
    endpoint: 'https://1ilf5j.logto.app/',
    appId: process.env.LOGTO_APPID,
    appSecret: process.env.LOGTO_SECRET,
    baseUrl: process.env.BASE_URL, // Change to your own base URL
    cookieSecret: process.env.LOGTO_COOK_SECRET, // Auto-generated 32 digit secret
    cookieSecure: process.env.NODE_ENV === 'production',
};