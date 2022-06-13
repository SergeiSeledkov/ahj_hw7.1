import XHR from './XHR';
import ChangeDom from './ChangeDom';
import Popup from './Popup';
import Wait from './Wait';

export default class SendRequest {
  constructor() {
    this.xhr = new XHR('https://ahj-hw7.herokuapp.com/');
    this.wait = new Wait();
    this.changeDom = new ChangeDom();
  }

  firstLoad(callbackForApp) {
    this.wait.waitOpen();
    this.xhr.sending({
      method: 'GET',
      url: 'method=allTickets',
      callback: (response) => {
        callbackForApp(response);
      },
    });
  }

  changeStatus(id, checked) {
    let check = checked;

    if (check) {
      check = 'close';
    }

    if (!check) {
      check = 'open';
    }

    this.xhr.sending({
      method: 'PATCH',
      url: `method=changeTicket&id=${id}&status=${check}`,
      callback: () => { },
    });
  }

  changeTicket(elem) {
    const popup = new Popup();

    this.wait.waitOpen();
    this.xhr.sending({
      method: 'GET',
      url: `method=ticketById&id=${elem.id}`,
      callback: (response) => {
        popup.openChange(response, elem);
      },
    });
  }

  formSend(element, callback) {
    const form = element;

    form.classList.add('hidden');
    this.wait.waitOpen();

    if (form.dataset.action === 'change') {
      const smallDesc = form.querySelector('.description__small-input').value;
      const fullDesc = form.querySelector('.description__full-input').value;

      this.xhr.sending({
        method: 'PATCH',
        url: `method=changeTicket&id=${form.dataset.id}&name=${smallDesc}&description=${fullDesc}`,
        callback: () => {
          this.changeDom.changeTicket(smallDesc, form.dataset.id);
          form.removeAttribute('data-id');
          form.removeAttribute('data-action');
          form.querySelector('.description__wrapper').remove();
        },
      });
    }

    if (form.dataset.action === 'delete') {
      this.xhr.sending({
        method: 'DELETE',
        url: `method=deleteTicket&id=${form.dataset.id}`,
        callback: () => {
          this.changeDom.deleteTicket(form.dataset.id);
          form.removeAttribute('data-id');
          form.removeAttribute('data-action');
          form.querySelector('.overlay__popup-text').textContent = '';
        },
      });
    }

    if (form.dataset.action === 'create') {
      const smallDesc = form.querySelector('.description__small-input').value;
      const fullDesc = form.querySelector('.description__full-input').value;

      this.xhr.sending({
        method: 'POST',
        url: `method=createTicket&name=${smallDesc}&description=${fullDesc}`,
        callback: (response) => {
          callback(response);
          form.removeAttribute('data-action');
          form.querySelector('.description__wrapper').remove();
        },
      });
    }
  }

  openDescription(elem) {
    this.xhr.sending({
      method: 'GET',
      url: `method=ticketById&id=${elem.id}`,
      callback: (response) => {
        this.changeDom.openDescription(response, elem);
      },
    });
  }
}
