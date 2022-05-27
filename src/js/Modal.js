import HtmlTicket from './HtmlTicket';

export default class Modal extends HtmlTicket {
  constructor(modal, modalForm, modalHead, modalContrl, modalDesc, cancel, ticketList, negotiator) {
    super();
    this.modal = modal;
    this.modalForm = modalForm;
    this.modalHeader = modalHead;
    this.modalFormControls = modalContrl;
    this.modalFormDescription = modalDesc;
    this.cancelBtn = cancel;
    this.ticketsList = ticketList;
    this.negotiator = negotiator;
  }

  assignCommonHandler() {
    this.modalForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const { ticketId } = event.currentTarget.dataset;
      const postParams = new URLSearchParams();
      let ticket;

      if (ticketId) {
        ticket = this.ticketsList.querySelector(`#${ticketId}`);
      }

      Array.from(event.currentTarget.elements)
        .filter(({ name }) => name)
        .forEach(({ name, value }) => postParams.append(name, value));
      postParams.append('status', false);
      postParams.append('method', 'createTicket');

      if (this.modalHeader.innerText === 'Add ticket') {
        this.negotiator.createRequest({
          method: 'POST',
          data: postParams,
          callback: (response) => {
            const receivedData = JSON.parse(response);
            const ticketHTML = this.constructor.getTicketHTML(receivedData);
            this.ticketsList.insertAdjacentHTML('beforeend', ticketHTML);
            this.modalFormControls.classList.remove('active');
          },
        });
      } else if (this.modalHeader.innerText === 'Change ticket') {
        const ticketName = ticket.querySelector('.ticket__name');
        const ticketDescription = ticket.querySelector('.ticket__description');
        const patchParams = new URLSearchParams();
        Array.from(event.currentTarget.elements)
          .filter(({ name }) => name)
          .forEach(({ name, value }) => patchParams.append(name, value));
        patchParams.append('id', ticketId);
        patchParams.append('method', 'changeTicket');
        this.negotiator.createRequest({
          method: 'PATCH',
          data: patchParams,
          callback: (response) => {
            const receivedData = JSON.parse(response);
            if (Object.prototype.hasOwnProperty.call(receivedData, 'name')) {
              ticketName.firstChild.replaceWith(receivedData.name);
            }
            if (Object.prototype.hasOwnProperty.call(receivedData, 'description')) {
              ticketDescription.innerText = receivedData.description;
            }
            this.modalFormControls.classList.remove('active');
          },
        });
      } else if (this.modalHeader.innerText === 'Delete ticket') {
        this.negotiator.createRequest({
          method: 'DELETE',
          url: `?method=deleteTicket&id=${ticketId}`,
          callback: () => {
            ticket.remove();
            this.modalFormDescription.classList.remove('active');
          },
        });
      }
      this.modalForm.reset();
      this.modal.classList.remove('active');
    });
  }

  assignCancelBtnHandler() {
    this.cancelBtn.onclick = (event) => {
      this.modalForm.reset();
      this.modalFormControls.classList.remove('active');
      this.modalFormDescription.classList.remove('active');
      event.currentTarget.closest('.modal').classList.remove('active');
    };
  }
}
