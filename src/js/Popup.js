import Wait from './Wait';

export default class Popup {
  constructor() {
    this.overlay = document.querySelector('.overlay');
    this.popup = document.querySelector('.overlay__popup');
    this.wait = new Wait();
  }

  openChange(res, elem) {
    let response = res;
    const overlayTitle = this.popup.querySelector('.overlay__popup-title');
    const overlayText = this.popup.querySelector('.overlay__popup-text');

    overlayTitle.textContent = 'Change Ticket';
    overlayText.append(this.createField());

    const descFull = this.popup.querySelector('.description__full-input');
    const descSmall = this.popup.querySelector('.description__small-input');

    response = JSON.parse(response);
    descFull.value = response.description;
    descSmall.value = response.name;

    this.wait.waitClose();

    this.popup.dataset.id = elem.id;
    this.popup.dataset.action = 'change';
    document.body.style.overflow = 'hidden';
    this.popup.classList.remove('hidden');
    this.overlay.classList.remove('hidden');
  }

  openDelete(elem) {
    const popupTitle = this.popup.querySelector('.overlay__popup-title');
    const popupText = this.popup.querySelector('.overlay__popup-text');

    popupTitle.textContent = 'Delete Ticket';
    popupText.textContent = 'Are you sure you want to delete ticket?';

    this.popup.dataset.id = elem.id;
    this.popup.dataset.action = 'delete';
    document.body.style.overflow = 'hidden';
    this.popup.classList.remove('hidden');
    this.overlay.classList.remove('hidden');
  }

  openCreate() {
    const overlayTitle = this.popup.querySelector('.overlay__popup-title');
    const overlayText = this.popup.querySelector('.overlay__popup-text');

    overlayTitle.textContent = 'Create Ticket';
    overlayText.append(this.createField());

    this.popup.dataset.action = 'create';
    document.body.style.overflow = 'hidden';
    this.popup.classList.remove('hidden');
    this.overlay.classList.remove('hidden');
  }

  createField() {
    const descriptionWrapper = document.createElement('div');
    const smallDescriptionText = document.createElement('span');
    const smallDescriptionInput = document.createElement('input');
    const fullDescriptionText = document.createElement('span');
    const fullDescriptionInput = document.createElement('textarea');

    descriptionWrapper.classList.add('description__wrapper');
    smallDescriptionText.classList.add('description__small-text');
    smallDescriptionInput.classList.add('description__small-input');
    fullDescriptionText.classList.add('description__full-text');
    fullDescriptionInput.classList.add('description__full-input');

    smallDescriptionText.innerText = 'Enter a short description';
    fullDescriptionText.innerText = 'Enter full description';

    descriptionWrapper.append(smallDescriptionText);
    descriptionWrapper.append(smallDescriptionInput);
    descriptionWrapper.append(fullDescriptionText);
    descriptionWrapper.append(fullDescriptionInput);

    return descriptionWrapper;
  }
}
