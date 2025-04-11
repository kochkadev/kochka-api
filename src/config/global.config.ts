export const PORT = 'PORT';
export const PROXY = 'PROXY';
export const COOKIE_DOMAIN = 'COOKIE_DOMAIN';
export const HTTP_TIMEOUT = 'HTTP_TIMEOUT';
export const HTTP_MAX_REDIRECTS = 'HTTP_MAX_REDIRECTS';
export const FRONTEND_DOMAIN = 'FRONTEND_DOMAIN';
export const PROTOCOL_STR = 'PROTOCOL_STR';
export const SALT_ROUNDS = 'SALT_ROUNDS';

export const FILE_UPLOAD_DESTINATION = './static';

export default () => ({
  [PORT]: process.env[PORT] || 3001,
  [PROXY]: process.env[PROXY] || 'api',
  [COOKIE_DOMAIN]: process.env[COOKIE_DOMAIN] || 'localhost',
  [HTTP_TIMEOUT]: Number(process.env[HTTP_TIMEOUT]) || 5000,
  [HTTP_MAX_REDIRECTS]: Number(process.env[HTTP_MAX_REDIRECTS]) || 5,
  [FRONTEND_DOMAIN]: process.env[FRONTEND_DOMAIN] || 'localhost',
  [PROTOCOL_STR]: process.env[PROTOCOL_STR] || 'http',
  [SALT_ROUNDS]: Number(process.env[SALT_ROUNDS]) || 10,
});
