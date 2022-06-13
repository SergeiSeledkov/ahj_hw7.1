export default class Wait {
  constructor() {
    this.overlay = document.querySelector('.overlay');
  }

  waitOpen() {
    const wait = this.overlay.querySelector('.overlay__wait');

    wait.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    if (this.overlay.classList.contains('hidden')) {
      this.overlay.classList.remove('hidden');
    }
  }

  waitClose() {
    const wait = this.overlay.querySelector('.overlay__wait');

    document.body.style.overflow = null;
    wait.classList.add('hidden');
    this.overlay.classList.add('hidden');
  }
}
