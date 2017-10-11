export const removeHtmlTags = (string) => {
  if (typeof string == 'undefined') string = 'undefined';
  if (typeof string != 'string') string = JSON.stringify(string);
  return string.replace(/<(?:.|\n)*?>/gm, '');
}

export const getPictureUrl = (url = '/src/assets/img/avatar5.png') =>
  url.startsWith('https://') || url.startsWith('http://')
    ? url
    : `https://dojo-ibl.appspot.com${url}`;
