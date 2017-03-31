import { OscillatorType } from './oscillator-type';

export class Voice {

  private gainNode: GainNode;
  private osc: OscillatorNode;

  constructor(private context: AudioContext, private type: OscillatorType) {
    this.osc = this.context.createOscillator();
    this.osc.type = this.type;

    this.gainNode = this.context.createGain();
    this.osc.connect(this.gainNode);
  }

  public play (frequency: number = 440.0, delay: number = 0.04) {
    let now: number = this.context.currentTime;

    this.osc.frequency.value = frequency;
    this.gainNode.connect(this.context.destination);
    this.setToValue(1);
    this.osc.start();
  }

  public stop (delay: number = 0.03) {
    this.setToValue(0.00001);
    setTimeout(() => this.osc.stop(), 100);
  }

  public connect () {
    this.gainNode.connect(this.context.destination);
  }

  private setToValue (value: number, delay: number = 0.03) {
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.context.currentTime); 
    this.gainNode.gain.exponentialRampToValueAtTime(value, this.context.currentTime + delay);
  }
}

