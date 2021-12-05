export const hasClass = (ele: RefType<HTMLElement>, cls: string): boolean => {
  if (ele === null) {
    return false;
  }
  return ele.classList.contains(cls);
};

export const addClass = (ele: RefType<HTMLElement>, cls: string): void => {
  if (ele !== null && !hasClass(ele, cls)) {
    ele.classList.add(cls);
  }
};

export const addClasses = (ele: RefType<HTMLElement>, cls: string[]): void => {
  if (ele !== null) {
    cls.forEach((val) => {
      if (!hasClass(ele, val)) {
        addClass(ele, val);
      }
    });
  }
};

export const removeClass = (ele: RefType<HTMLElement>, cls: string): void => {
  if (ele !== null && hasClass(ele, cls)) {
    ele.classList.remove(cls);
  }
};

export const removeClasses = (
  ele: RefType<HTMLElement>,
  cls: string[]
): void => {
  if (ele !== null) {
    cls.forEach((val) => {
      if (hasClass(ele, val)) {
        removeClass(ele, val);
      }
    });
  }
};

export const toggleClass = (ele: RefType<HTMLElement>, cls: string): void => {
  if (ele !== null) {
    ele.classList.toggle(cls);
  }
};

export const toggleClasses = (
  ele: RefType<HTMLElement>,
  cls: string[]
): void => {
  if (ele !== null) {
    cls.forEach((val) => {
      toggleClass(ele, val);
    });
  }
};
