export const requestWithToken = (url, token) => {
  return fetch(`https://dojo-ibl.appspot.com/rest/${url}`, {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  }).then(response => response.json());
};
