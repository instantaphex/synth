import { MidiMapper } from '../utils/midi-mapper.ts';
import { SoundGenerator } from '../sound-generators/sound-generator.ts';

export class QwertyController {
  private keysHeld: {[key: number]: boolean;} = {};
  private mapper: MidiMapper = new MidiMapper();
  private soundGenerator: SoundGenerator;
  private keyMap: {[asciiVal: number]: number;};

  constructor () {
    this.setupKeymap();
    this.listenForKeys();
  }

  public setupKeymap (): void {
    this.keyMap = {
      90: 48,
      83: 49,
      88: 50,
      68: 51,
      67: 52,
      86: 53,
      71: 54,
      66: 55,
      72: 56,
      78: 57, 
      74: 58,
      77: 59,
      188: 60,
    };
  }

  public listenForKeys () {
    document.addEventListener('keydown', (evt: KeyboardEvent) => this.keyPressed(evt));
    document.addEventListener('keyup', (evt: KeyboardEvent) => this.keyReleased(evt));
  }

  public keyPressed (evt: KeyboardEvent) {
    if (!this.keysHeld[evt.keyCode] && this.keyMap[evt.keyCode]) {
      let midiNote = this.keyMap[evt.keyCode]; 
      this.keysHeld[midiNote] = true;
      this.soundGenerator.play(midiNote);
    }
  }

  public keyReleased (evt: KeyboardEvent) {
    let midiNote: number = this.keyMap[evt.keyCode]; 
    this.keysHeld[midiNote] = false;
    this.soundGenerator.stop(midiNote);
  }

  public connect (gen: SoundGenerator): SoundGenerator {
    this.soundGenerator = gen;
    return gen;
  }

  public disconnect (): void {
    this.soundGenerator = void(0);
  }
}
