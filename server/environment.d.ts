declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      DATABASE: string;
      DATABASE_HOST: string;
      DATABASE_USERNAME: string;
      DATABASE_PASSWORD: string;
    }
  }
}
export {};
