import Block from "../core/Block";

export const checkEmail = (val: string, component: Block): boolean => {
  if (isEmail(val)) {
    component.setProps({ value: val, helper: "", error: false });
    return true;
  } else {
    component.setProps({
      value: val,
      helper: "Нужно ввести валидный email",
      error: true,
    });
    return false;
  }
};

export const isEmail = (value: string) => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    value
  );
};
