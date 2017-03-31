import { MidiMapper } from './midi-mapper.ts';
import { Synth } from './synth.ts';

export class Keyboard {
  private keysHeld: {[key: number]: boolean;} = {};
  private mapper: MidiMapper = new MidiMapper();

  constructor (private synth: Synth) {
    this.listenForKeys();
  }

  listenForKeys () {
    document.addEventListener('keydown', (evt: KeyboardEvent) => this.keyPressed(evt));
    document.addEventListener('keyup', (evt: KeyboardEvent) => this.keyReleased(evt));
  }

  keyPressed (evt: KeyboardEvent) {
    if (!this.keysHeld[evt.keyCode]) {
      let midiNote = this.mapper.keyCodeToMidi(evt.keyCode); 
      this.keysHeld[midiNote] = true;
      this.synth.play(midiNote);
    }
  }

  keyReleased (evt: KeyboardEvent) {
    let midiNote: number = this.mapper.keyCodeToMidi(evt.keyCode); 
    this.keysHeld[midiNote] = false;
    this.synth.stop(midiNote);
  }
}
