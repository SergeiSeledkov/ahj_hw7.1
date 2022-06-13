import SendRequest from './SendRequest';
import Events from './Events';
import ChangeDom from './ChangeDom';
import CreateTicketHtml from './CreateTicketHtml';

const sendRequest = new SendRequest();
const changeDom = new ChangeDom();
let events = new Events();
const addButton = document.querySelector('.add-button');
const buttonOk = document.querySelector('.overlay__popup-button-ok');
const buttonCancel = document.querySelector('.overlay__popup-button-cancel');
const overlay = document.querySelector('.overlay');

function firstLoad(res) {
  let response = res;

  response = JSON.parse(response);

  for (const i of response) {
    const createTicketHtml = new CreateTicketHtml(i.id, i.name, i.status, i.created);
    const ticketWrapper = createTicketHtml.create();

    events = new Events(ticketWrapper);
    events.eventStatus();
    events.eventChange();
    events.eventDelete();
    events.eventFullDescription();
    changeDom.addTicket(ticketWrapper);
  }
}

sendRequest.firstLoad(firstLoad);
events.addButton(addButton);
events.confirmForm(buttonOk);
events.closeForm(buttonCancel);
events.overlayScroll(overlay);
