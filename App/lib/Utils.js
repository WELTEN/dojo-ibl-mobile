export default class Utils {
  static removeHtmlTagsFromString(string) {
    return string.replace(/<(?:.|\n)*?>/gm, '');
  }
}
