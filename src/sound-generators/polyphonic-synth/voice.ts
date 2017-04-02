import { Audio } from '../../core/audio.ts';
import { OscillatorType } from '../../types/oscillator-type.ts';

export class Voice {

  private gainNode: GainNode;
  private osc: OscillatorNode;
  private context: AudioContext = Audio.getInstance().context;
  private audio: Audio = Audio.getInstance();

  constructor(private type: OscillatorType) {
    this.osc = this.audio.createOscillator(type);
    this.gainNode = this.audio.createGain();
    this.osc.connect(this.gainNode);
  }

  public play (frequency: number = 440.0) {
    let now: number = this.context.currentTime;

    this.osc.frequency.value = frequency;
    this.setToValue(1);
    this.osc.start();
  }

  public stop (delay: number = 0.03) {
    this.setToValue(0.00001);
    setTimeout(() => this.osc.stop(), 100);
  }

  public connect (destination: AudioNode) {
    this.gainNode.connect(destination);
  }

  private setToValue (value: number, delay: number = 0.03) {
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.context.currentTime); 
    this.gainNode.gain.exponentialRampToValueAtTime(value, this.context.currentTime + delay);
  }
}

