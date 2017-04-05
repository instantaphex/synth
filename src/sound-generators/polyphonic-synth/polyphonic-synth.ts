import { Audio } from '../../core/audio.ts';
import { Voice } from './voice.ts';
import { MidiMapper } from '../../utils/midi-mapper.ts';
import { OscillatorType } from '../../types/oscillator-type.ts';
import { SoundGenerator } from '../sound-generator.ts';

export class PolyphonicSynth implements SoundGenerator {
  
  public context: AudioContext = Audio.getInstance().context;
  public voices: Map<number, Voice> = new Map();
  public mapper: MidiMapper = new MidiMapper();
  public wave: OscillatorType;

  private output: GainNode;

  constructor() {
    this.wave = 'triangle'; 
    this.output = this.context.createGain();
  }

  public play (midiNote: number) {
    // TODO maybe stop it first?
    if (this.voices.get(midiNote)) { return; }
    
    let voice = new Voice(this.wave);
    voice.connect(this.output);

    this.voices.set(midiNote, voice);
    let frequency = this.mapper.midiToFrequency(midiNote); 
    voice.play(frequency);
  }

  public stop (keyCode: number) {
    let voice: Voice = this.voices.get(keyCode);
    if (voice) {
      voice.stop();
      this.voices.delete(keyCode);
    }
  }

  public connect (node: AudioNode): AudioNode {
    this.output.connect(node);
    return node;
  }

  public disconnect(): void {
    this.output.disconnect();
  }
}

