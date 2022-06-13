import changeImg from '../img/pencil.png';
import deleteImg from '../img/cross.png';

export default class CreateTicketHtml {
  constructor(id, name, status, created) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.created = created;
  }

  create() {
    const ticketsWrapper = document.createElement('div');
    const ticketsStatus = document.createElement('div');
    const ticketsStatusLabel = document.createElement('label');
    const ticketsStatusCheckbox = document.createElement('input');
    const ticketsStatusCheckboxImg = document.createElement('span');
    const ticketsName = document.createElement('div');
    const ticketsNameText = document.createElement('div');
    const ticketsDescription = document.createElement('div');
    const ticketsDate = document.createElement('div');
    const ticketsButton = document.createElement('div');
    const ticketsChange = document.createElement('div');
    const ticketsChangeImg = document.createElement('img');
    const ticketsDelete = document.createElement('div');
    const ticketsDeleteImg = document.createElement('img');

    ticketsWrapper.classList.add('tickets__wrapper');
    ticketsWrapper.id = this.id;
    ticketsStatus.classList.add('tickets__status');
    ticketsStatusLabel.classList.add('tickets__status-label');
    ticketsStatusCheckbox.classList.add('tickets__status-checkbox');
    ticketsStatusCheckboxImg.classList.add('tickets__status-checkbox-img');
    ticketsName.classList.add('tickets__name');
    ticketsNameText.classList.add('tickets__name-text');
    ticketsDescription.classList.add('tickets__name-description');
    ticketsDescription.classList.add('hidden');
    ticketsDate.classList.add('tickets__date');
    ticketsButton.classList.add('tickets__button');
    ticketsChange.classList.add('tickets__change');
    ticketsChangeImg.classList.add('tickets__change-img');
    ticketsDelete.classList.add('tickets__delete');
    ticketsDeleteImg.classList.add('tickets__delete-img');

    ticketsNameText.textContent = this.name;
    ticketsDate.textContent = this.created;

    ticketsStatusCheckbox.setAttribute('type', 'checkbox');
    ticketsChangeImg.setAttribute('src', changeImg);
    ticketsChangeImg.setAttribute('alt', 'change');
    ticketsDeleteImg.setAttribute('src', deleteImg);
    ticketsDeleteImg.setAttribute('alt', 'delete');

    if (this.status === 'open') {
      ticketsStatusCheckbox.checked = false;
    }

    if (this.status === 'close') {
      ticketsStatusCheckbox.checked = true;
    }

    ticketsStatusLabel.append(ticketsStatusCheckbox);
    ticketsStatusLabel.append(ticketsStatusCheckboxImg);
    ticketsStatus.append(ticketsStatusLabel);
    ticketsName.append(ticketsNameText);
    ticketsName.append(ticketsDescription);
    ticketsChange.append(ticketsChangeImg);
    ticketsDelete.append(ticketsDeleteImg);
    ticketsButton.append(ticketsChange);
    ticketsButton.append(ticketsDelete);
    ticketsWrapper.append(ticketsStatus);
    ticketsWrapper.append(ticketsName);
    ticketsWrapper.append(ticketsDate);
    ticketsWrapper.append(ticketsButton);

    return ticketsWrapper;
  }
}
