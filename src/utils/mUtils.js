export const setStore = (name, content) => {
  if (!name) {
    return;
  }
  window.localStorage.setItem(name, _.isObject(content) ? JSON.stringify(content) : content);
};

export const getStore = (name) => {
  if (!name) {
    return '';
  }
  const data = window.localStorage.getItem(name);
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

export const removeStore = (name) => {
  if (!name) {
    return;
  }
  window.localStorage.removeItem(name);
};

export const setUser = user => setStore('my-ops-user', user);
export const getUser = () => getStore('my-ops-user');

export const globalEnterEvent = {
  bind(cb) {
    document.onkeydown = (event) => {
      if (event.keyCode === 13) {
        cb();
      }
    };
  },
  remove() {
    document.onkeydown = null;
  },
};

export const wrapper = {
  waitingWrapper: (context, prop, fn) => async (...args) => {
    if (_.isUndefined(context, prop)) {
      throw new Error(`waitingWrapper:${prop}属性未绑定`);
    }

    const ctx = context;
    ctx[prop] = true;
    try {
      return await fn(...args);
    } finally {
      ctx[prop] = false;
    }
  },

  validateWrapper: (context, formHref, fn) => async (...args) => {
    await context.$refs[formHref].validate();
    return fn(...args);
  },
};
