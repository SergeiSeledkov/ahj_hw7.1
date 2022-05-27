export default class RequestContructor {
  constructor(url) {
    this.url = url;
  }

  createRequest(options) {
    if (!options) {
      throw new Error('no correct options');
    }

    const { method, data, callback } = options;
    let inputUrl = this.url;
    const xhr = new XMLHttpRequest();

    if (options.url) {
      inputUrl += options.url;
    }

    try {
      xhr.open(method, inputUrl);

      xhr.onloadend = () => {
        if (String(xhr.status).startsWith('2')) {
          if (callback) {
            callback(xhr.response);
          }
        }
      };

      if (data === undefined) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
