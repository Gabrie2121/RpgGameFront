export default {
  meEndpoint: 'http://177.85.121.34:8080/api/me',
  loginEndpoint: 'http://177.85.121.34:8080/api/login',
  registerEndpoint: 'http://177.85.121.34:8080/api/users/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
