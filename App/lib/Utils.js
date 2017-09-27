export default class Utils {
  static removeHtmlTagsFromString(string) {
    if (typeof string == 'undefined') string = 'undefined';
    if (typeof string != 'string') string = JSON.stringify(string);
    return string.replace(/<(?:.|\n)*?>/gm, '');
  }

  static getParentComment(parentId, allComments) {
    for (let comment of allComments) {
      if (comment.responseId == parentId) return comment
    }

    return false;
  }
}
