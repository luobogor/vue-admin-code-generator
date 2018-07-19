export const regex = {
  number2Point: /^\d+(\.\d{1,2})?$/,
  alphabet: /^[A-Za-z]+$/,
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export const isEmail = email => regex.email.test(email);
export const removeAllSpace = str => str.replace(/\s/g, '');
