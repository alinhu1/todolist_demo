declare global {
    declare namespace NodeJS {
        interface ProcessEnv {
            LOGTO_APPID: string;
            LOGTO_SECRET: string;
            BASE_URL: string;
            LOGTO_COOK_SECRET: string;
        }
    }
}

export { }