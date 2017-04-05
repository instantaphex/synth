import { Audio } from '../core/audio.ts';
import { PolyphonicSynth } from '../sound-generators/polyphonic-synth/polyphonic-synth.ts';
import { QwertyController } from '../midi-controllers/qwerty-controller.ts';
import { Delay } from '../effects/delay.ts';
import { AudioEffect } from '../effects/audio-effect.ts';

export class TestSynth {
  private ctx = Audio.getInstance().context;
  private controller: QwertyController = new QwertyController();
  private synth: PolyphonicSynth = new PolyphonicSynth();
  private delay: AudioEffect = new Delay();
  private output: AudioNode = this.ctx.createGain();

  constructor() {
    // dry mix
    this.controller
      .connect(this.synth)
      .connect(this.output);

    // wet mix
    this.synth
      .connect(this.delay.getInput())
      .connect(this.output);
  }

  public connect(node: AudioNode): AudioNode {
    this.output.connect(node);
    return node;
  }
}

