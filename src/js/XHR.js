export default class XHR {
  constructor(domain) {
    this.domain = domain;
  }

  sending(parameters) {
    const xhr = new XMLHttpRequest();
    const { method, url, callback } = parameters;

    xhr.open(method, `${this.domain}?${url}`);
    xhr.send();

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          callback(xhr.responseText);
        } catch (e) {
          throw new Error(e);
        }
      }
    });
  }
}
