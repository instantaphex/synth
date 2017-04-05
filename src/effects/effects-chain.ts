import { AudioEffect } from './audio-effect';
import { Audio } from '../core/audio.ts';

export class EffectsChain {
	public chain: AudioEffect[] = [];
	public input: GainNode = Audio.getInstance().context.createGain();
	public output: GainNode = Audio.getInstance().context.createGain();
	private chained: boolean = false;

	constructor() {}

	public addEffect(effect: AudioEffect): void {
		this.chain.push(effect);
	}

	public getInput(): AudioNode {
		return this.input;
	}

	public chainEffects(): void {
		if (this.chained) {
			// disconnect
			this.input.disconnect();
			this.chain[this.chain.length - 1].disconnect();
		}

		if (this.chain.length){ 
      // this.input.connect(this.chain[0]);
			// connect effects to each other, then output
			for(let i = 0; i < this.chain.length; i++) {
				if (this.chain[i + 1]) {
					this.chain[i].connect(this.chain[i + i].getInput());
				} else {
					this.chain[i].connect(this.output);
				}
			}
			this.chained = true;
		}
	}

	public connect(node: AudioNode): void {
		this.output.connect(node);
	}
}
