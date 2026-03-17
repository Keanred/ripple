type APIConfig = {
  port: number;
  address: string;
};

const config: APIConfig = {
  port: parseInt(process.env.PORT ?? '8080'),
  address: process.env.ADDRESS ?? 'localhost',
};

export default config;
