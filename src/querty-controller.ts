import { MidiMapper } from './midi-mapper.ts';
import { Synth } from './synth.ts';
import { SoundGenerator } from './sound-generator.ts';

export class QuertyController {
  private keysHeld: {[key: number]: boolean;} = {};
  private mapper: MidiMapper = new MidiMapper();
  private soundGenerator: SoundGenerator;

  constructor () {
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
      this.soundGenerator.play(midiNote);
    }
  }

  keyReleased (evt: KeyboardEvent) {
    let midiNote: number = this.mapper.keyCodeToMidi(evt.keyCode); 
    this.keysHeld[midiNote] = false;
    this.soundGenerator.stop(midiNote);
  }

  connect (gen: SoundGenerator): void {
    this.soundGenerator = gen;
  }
}
