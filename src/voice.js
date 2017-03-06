export class Voice {
  constructor(context, type) {
    this.context = context 

    this.osc = this.context.createOscillator();
    this.osc.type = type;

    this.gain = this.context.createGain();

    this.osc.connect(this.gain);
    this.gain.gain.exponentialRampToValueAtTime(0.0001, this.context.currentTime + 0.03);
    this.osc.start();
  }

  play (frequency = 440.0, delay = 0.04) {
    let now = this.context.currentTime;

    this.osc.frequency.value = frequency;
    this.gain.connect(this.context.destination);
    this.gain.gain.setValueAtTime(1, now + delay);
    this.gain.gain.exponentialRampToValueAtTime(1, now + delay);
  }

  stop (delay = 0.03) {
    let now = this.context.currentTime;

    this.gain.gain.setValueAtTime(this.gain.gain.value, this.context.currentTime); 
    this.gain.gain.exponentialRampToValueAtTime(0.0001, this.context.currentTime + 0.03);
    setTimeout(() => {
      this.osc.stop();
    }, 100);
    // this.gain.disconnect(this.context.destination);
  }
}

