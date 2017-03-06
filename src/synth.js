import { Voice } from './voice.js';
import { MidiMapper } from './midi-mapper.js';

export class Synth {

  constructor() {
    this.context = new AudioContext();
    this.voices = new Map();
    this.mapper = new MidiMapper();
  }

  play (keyCode, delay = 0.04) {
    let voice = new Voice(this.context, 'triangle');
    this.voices.set(keyCode, voice);
    let frequency = this.mapper.keyCodeToFrequency(keyCode); 
    voice.play(frequency);
  }

  stop (keyCode, delay = 0.03) {
    let voice = this.voices.get(keyCode);
    voice.stop();
    this.voices.delete(keyCode);
  }
}

