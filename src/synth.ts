import { Voice } from './voice.ts';
import { MidiMapper } from './midi-mapper.ts';
import { OscillatorType } from './oscillator-type.ts';

export class Synth {
  
  public context: AudioContext = new AudioContext();
  public voices: Map<number, Voice> = new Map();
  public mapper: MidiMapper = new MidiMapper();
  public wave: OscillatorType;

  constructor() {
    this.wave = 'triangle'; 
  }

  public play (midiNote: number, delay: number = 0.00) {
    // TODO maybe stop it first?
    if (this.voices.get(midiNote)) { return; }
    
    let voice = new Voice(this.context, this.wave);
    this.voices.set(midiNote, voice);
    let frequency = this.mapper.midiToFrequency(midiNote); 
    voice.play(frequency);
  }

  public stop (keyCode: number, delay: number = 0.00) {
    let voice: Voice = this.voices.get(keyCode);
    if (voice) {
      voice.stop();
      this.voices.delete(keyCode);
    }
  }
}

