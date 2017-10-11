export const requestWithToken = (url, token) => {
  return fetch(getUrl(url), {
    method: 'GET',
    headers: getAuthHeader(token)
  }).then(toJson);
};

export const postRequestWithToken = (url, token, data) => {
  return fetch(getUrl(url), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(token)
    },
    body: JSON.stringify(data)
  }).then(toJson);
}

const getUrl = url => `https://dojo-ibl.appspot.com/rest/${url}`;
const getAuthHeader = token => ({ 'Authorization': token });
const toJson = response => response.json();
