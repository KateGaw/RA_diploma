/*eslint-disable array-callback-return*/
/*eslint-disable eqeqeq*/

export const addItem = (key, value) => {
  const storage = getItemsArray();

  if (storage.length > 0) {
    if (storage.some((item) => item[0] == value[0] && item[2] == value[2])) {
      storage.map((item) => {
        if (item[0] == value[0] && item[2] == value[2]) {
          item[4] = parseInt(item[4]) + value[4];
          localStorage.setItem(findKeyById(item[0]), item);
        }
      });
    } else {
      localStorage.setItem(key, value);
    }
  } else {
    localStorage.setItem(key, value);
  }
};

export const getItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const deleteItem = (key) => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};

export const countItems = () => {
  return localStorage.length;
};

export const getItemsArray = () => {
  let values = [];
  const keys = Object.keys(localStorage);
  let i = keys.length;

  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }

  let output = [];
  values.map((item) => {
    output.push(item.split(","));
  });

  return output;
};

export const findKeyById = (id) => {
  let keys = Object.keys(localStorage);
  let output = null;
  let outputValue;
  const items = getItemsArray();
  items.map((item) => {
    if (item[0] === id) {
      outputValue = item.join(",");
    }
  });

  for (let key of keys) {
    if (outputValue === localStorage.getItem(key)) {
      output = key;
    }
  }

  return output;
};
