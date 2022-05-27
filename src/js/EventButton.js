export default class EventButton {
  constructor(addBtn, modal, modalHeader, modalFormControls) {
    this.addBtn = addBtn;
    this.modal = modal;
    this.modalHeader = modalHeader;
    this.modalFormControls = modalFormControls;
  }

  assignHandler() {
    this.addBtn.addEventListener('click', () => {
      this.modalHeader.innerText = 'Add ticket';
      this.modalFormControls.classList.add('active');
      this.modal.classList.add('active');
    });
  }
}
