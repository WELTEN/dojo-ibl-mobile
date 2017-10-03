export const removeHtmlTags = (string) => {
  if (typeof string == 'undefined') string = 'undefined';
  if (typeof string != 'string') string = JSON.stringify(string);
  return string.replace(/<(?:.|\n)*?>/gm, '');
}
