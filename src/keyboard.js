export class Keyboard {
  constructor (synth) {
    this.listenForKeys();
    this.keysHeld = {};
    this.synth = synth;
  }

  listenForKeys () {
    document.addEventListener('keydown', (evt) => this.keyPressed(evt));
    document.addEventListener('keyup', (evt) => this.keyReleased(evt));
  }

  keyPressed (evt) {
    if (!this.keysHeld[evt.keyCode]) {
      this.keysHeld[evt.keyCode] = true;
      this.synth.play(evt.keyCode);
    }
  }

  keyReleased (evt) {
    this.keysHeld[evt.keyCode] = false;
    this.synth.stop(evt.keyCode);
  }
}
