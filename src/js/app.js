import RequestContructor from './RequestContructor';
import Modal from './Modal';
import TicketsList from './TicketsList';
import EventButton from './EventButton';

const modalEl = document.querySelector('.modal');
const modalFormEl = modalEl.querySelector('.modal__form');
const modalHeaderEl = modalEl.querySelector('.modal__header');
const modalFormControlsEl = modalEl.querySelector('.form__controls');
const modalFormDescriptionEl = modalEl.querySelector('.form__description');
const cancelBtnEl = modalEl.querySelector('.modal__button-cancel');
const ticketsListEl = document.querySelector('.tickets__list');
const addBtnEl = document.querySelector('.add-button');

const eventButton = new EventButton(
  addBtnEl,
  modalEl,
  modalHeaderEl,
  modalFormControlsEl,
);

eventButton.assignHandler();

const requestContructor = new RequestContructor('https://localhost:3000');

const modal = new Modal(
  modalEl,
  modalFormEl,
  modalHeaderEl,
  modalFormControlsEl,
  modalFormDescriptionEl,
  cancelBtnEl,
  ticketsListEl,
  requestContructor,
);

modal.assignCommonHandler();
modal.assignCancelBtnHandler();

const ticketsList = new TicketsList(
  ticketsListEl,
  modalEl,
  modalFormEl,
  modalHeaderEl,
  modalFormControlsEl,
  modalFormDescriptionEl,
  requestContructor,
);

ticketsList.assignHandler();
ticketsList.downloadTickets();
