/**
 * 判断该字符串是否是url链接
 * @param {String} url 字符串
 * @returns {Boolean} 返回布尔值
 */
export const isExternalLink = (url: string): boolean => url.startsWith("http");

/**
 * 打开外部链接
 * @param {String} url url字符串
 * @param {"_blank" | "_self"} target 打开链接的方式
 */
export const openLink = (
  url: string,
  target: "_blank" | "_self" = "_blank"
): void => {
  if (window.open) {
    window.open(url, target, "noreferrer,noopener");
  } else {
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", target);
    a.setAttribute("rel", "noreferrer noopener");
    a.setAttribute("id", "temp-archor-element");
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
};

export const isMobile = () => {
  const WIDTH = 768; // 小于768px为mobile, 大于为desktop
  const body = document.body.getBoundingClientRect();
  return body.width <= WIDTH;
};
