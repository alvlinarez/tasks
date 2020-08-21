// Function to get token from cookie
export const getToken = (token) => {
  if (!token) {
    return null;
  }
  let c_value = ' ' + token;
  let c_start = c_value.indexOf(' ' + 'token' + '=');
  if (c_start === -1) {
    c_value = null;
  } else {
    c_start = c_value.indexOf('=', c_start) + 1;
    let c_end = c_value.indexOf(';', c_start);
    if (c_end === -1) {
      c_end = c_value.length;
    }
    c_value = unescape(c_value.substring(c_start, c_end));
  }
  return c_value;
};
