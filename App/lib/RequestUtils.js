export default class RequestUtils {
  static requestWithToken(url, token) {
    return fetch(`https://dojo-ibl.appspot.com/rest/${url}`, {
        method: 'get',
        headers: {
          'Authorization': `GoogleLogin auth=${token.accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json());
  }
}
