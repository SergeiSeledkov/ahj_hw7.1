import Wait from './Wait';

export default class ChangeDom {
  constructor() {
    this.wait = new Wait();
  }

  addTicket(elem) {
    const tickets = document.querySelector('.tickets');

    tickets.append(elem);
    this.wait.waitClose();
  }

  changeTicket(smallDesc, id) {
    const ticketsWrapperAll = document.querySelectorAll('.tickets__wrapper');

    for (const i of [...ticketsWrapperAll]) {
      if (i.id === id) {
        const ticketText = i.querySelector('.tickets__name-text');

        ticketText.textContent = smallDesc;
        this.wait.waitClose();

        return;
      }
    }
  }

  deleteTicket(id) {
    const ticketsWrapperAll = document.querySelectorAll('.tickets__wrapper');

    for (const i of [...ticketsWrapperAll]) {
      if (i.id === id) {
        i.remove();
        this.wait.waitClose();

        return;
      }
    }
  }

  openDescription(result, element) {
    let res = result;
    const elem = element;
    const ticketsNameDescription = elem.querySelector('.tickets__name-description');
    const ticketsName = elem.querySelector('.tickets__name');
    const descriptionIndent = 15;
    const padding = parseInt(getComputedStyle(elem).paddingBottom, 10);

    res = JSON.parse(res);
    ticketsNameDescription.textContent = res.description;
    ticketsNameDescription.style.top = `${ticketsName.clientHeight + descriptionIndent}px`;
    ticketsNameDescription.style.opacity = 0;
    this.wait.waitClose();
    ticketsNameDescription.classList.remove('hidden');
    elem.style.paddingBottom = `${padding + ticketsNameDescription.clientHeight + descriptionIndent}px`;
    setTimeout(() => {
      ticketsNameDescription.style.opacity = null;
    }, 500);
    elem.classList.add('open');
  }
}
