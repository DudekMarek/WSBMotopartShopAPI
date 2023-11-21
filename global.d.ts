export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_NAME: string;
            DB_USERNAME: string;
            DB_PASSWORD: string;
            DB_PORT: string;
            PORT: string;
        }
    }
}

