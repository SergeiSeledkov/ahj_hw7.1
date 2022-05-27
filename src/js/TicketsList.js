import HtmlTicket from './HtmlTicket';

export default class TicketsList extends HtmlTicket {
  constructor(ticketList, modal, modalForm, modalHeader, modalContrl, modalDesc, negotiator) {
    super();
    this.ticketsList = ticketList;
    this.modal = modal;
    this.modalForm = modalForm;
    this.modalHeader = modalHeader;
    this.modalFormControls = modalContrl;
    this.modalFormDescription = modalDesc;
    this.negotiator = negotiator;
  }

  assignHandler() {
    this.ticketsList.addEventListener('click', (event) => {
      const { target } = event;
      const targetClass = target.className;
      const ticket = target.closest('.ticket');

      if (targetClass.startsWith('ticket__control-status')) {
        target.classList.toggle('active');
        const params = new URLSearchParams();
        params.append('id', ticket.id);
        params.append('status', target.classList.contains('active'));
        params.append('method', 'changeTicket');
        this.negotiator.createRequest({
          method: 'PATCH',
          data: params,
          callback: (response) => {
            const receivedData = JSON.parse(response);
            console.log(`Status change. Old status - ${ticket.id}, new status - ${receivedData.status}`);
          },
        });
      } else if (targetClass.startsWith('ticket__description')) {
        target.classList.remove('active');
      } else if (targetClass === 'ticket__control-edit') {
        this.modalForm.dataset.ticketId = ticket.id;
        this.modalHeader.innerText = 'Change ticket';
        this.modalFormControls.classList.add('active');
        this.modal.classList.add('active');
      } else if (targetClass === 'ticket__control-delete') {
        this.modalForm.dataset.ticketId = ticket.id;
        this.modalHeader.innerText = 'Delete ticket';
        this.modalFormDescription.classList.add('active');
        this.modal.classList.add('active');
      } else {
        const description = ticket.querySelector('.ticket__description');
        description.classList.add('active');
      }
    });
  }

  downloadTickets() {
    this.negotiator.createRequest({
      method: 'GET',
      url: '?method=allFullTickets',
      callback: (response) => {
        const receivedData = JSON.parse(response);
        let html = '';

        receivedData.forEach((item) => {
          html += this.constructor.getTicketHTML(item);
        });

        this.ticketsList.insertAdjacentHTML('beforeend', html);
      },
    });
  }
}
