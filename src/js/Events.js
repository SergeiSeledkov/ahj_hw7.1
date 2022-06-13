import Wait from './Wait';
import Popup from './Popup';
import SendRequest from './SendRequest';
import CreateTicketHtml from './CreateTicketHtml';
import ChangeDom from './ChangeDom';

export default class Events {
  constructor(elem) {
    this.elem = elem;
    this.wait = new Wait();
    this.popup = new Popup();
    this.sendRequest = new SendRequest();
  }

  eventStatus(element) {
    let elem = null;

    if (element) {
      elem = element;
    } else {
      elem = this.elem;
    }

    const statusImg = elem.querySelector('.tickets__status-checkbox-img');

    statusImg.addEventListener('click', () => {
      const inputCheckbox = elem.querySelector('.tickets__status-checkbox');

      setTimeout(() => {
        this.sendRequest.changeStatus(elem.id, inputCheckbox.checked);
      }, 0);
    });
  }

  eventChange(element) {
    let elem = null;

    if (element) {
      elem = element;
    } else {
      elem = this.elem;
    }

    const changeImg = elem.querySelector('.tickets__change-img');

    changeImg.addEventListener('click', () => {
      const wrapperAll = document.querySelectorAll('.tickets__wrapper');

      for (const i of [...wrapperAll]) {
        if (i.classList.contains('open')) {
          this.fullDescriptionClose(i);
        }
      }

      this.sendRequest.changeTicket(elem);
    });
  }

  eventDelete(element) {
    let elem = null;

    if (element) {
      elem = element;
    } else {
      elem = this.elem;
    }

    const deleteImg = elem.querySelector('.tickets__delete-img');

    deleteImg.addEventListener('click', () => {
      this.popup.openDelete(elem);
    });
  }

  eventFullDescription(element) {
    let elem = null;

    if (element) {
      elem = element;
    } else {
      elem = this.elem;
    }

    elem.addEventListener('click', (event) => {
      const name = elem.querySelector('.tickets__name');
      const nameText = elem.querySelector('.tickets__name-text');
      const nameDesc = elem.querySelector('.tickets__name-description');
      const date = elem.querySelector('.tickets__date');
      const e = event.target;

      if (e === elem || e === name || e === date || e === nameText || e === nameDesc) {
        if (elem.classList.contains('open')) {
          this.fullDescriptionClose(elem);
        } else {
          this.wait.waitOpen();
          this.sendRequest.openDescription(elem);
        }
      }
    });
  }

  fullDescriptionClose(element) {
    const elem = element;
    const ticketsNameDescription = elem.querySelector('.tickets__name-description');

    ticketsNameDescription.textContent = '';
    ticketsNameDescription.style.top = 0;
    ticketsNameDescription.classList.add('hidden');
    elem.style.paddingBottom = '10px';
    elem.classList.remove('open');
  }

  confirmForm(buttonOk) {
    buttonOk.addEventListener('click', () => {
      const form = buttonOk.closest('.overlay__popup');

      if (form.dataset.action === 'create') {
        this.sendRequest.formSend(form, (response) => {
          const res = JSON.parse(response);
          const createTicketHtml = new CreateTicketHtml(res.id, res.name, 'open', res.created);
          const ticketWrapper = createTicketHtml.create();
          const changeDom = new ChangeDom();

          this.eventStatus(ticketWrapper);
          this.eventChange(ticketWrapper);
          this.eventDelete(ticketWrapper);
          this.eventFullDescription(ticketWrapper);
          changeDom.addTicket(ticketWrapper);
        });
      } else {
        this.sendRequest.formSend(form);
      }
    });
  }

  closeForm(buttonCancel) {
    buttonCancel.addEventListener('click', () => {
      const form = buttonCancel.closest('.overlay__popup');
      const formText = form.querySelector('.overlay__popup-text');
      const overlay = form.closest('.overlay');

      document.body.style.overflow = null;
      overlay.classList.add('hidden');
      form.classList.add('hidden');
      formText.textContent = '';
      form.removeAttribute('data-id');
    });
  }

  addButton(addButton) {
    addButton.addEventListener('click', () => {
      this.popup.openCreate();
    });
  }

  overlayScroll(elem) {
    window.addEventListener('scroll', () => {
      const e = elem;

      e.style.top = `${window.pageYOffset}px`;
    });
  }
}
