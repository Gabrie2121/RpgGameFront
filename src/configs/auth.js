export default {
  meEndpoint: 'http://localhost:8080/api/me',
  loginEndpoint: 'http://localhost:8080/api/login',
  registerEndpoint: 'http://localhost:8080/api/users/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
