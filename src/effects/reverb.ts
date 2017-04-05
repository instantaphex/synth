import { Audio } from '../core/audio.ts';
import { AudioEffect } from './audio-effect.ts';

export class Reverb implements AudioEffect {
	public input: ConvolverNode;

	private context = Audio.getInstance().context;

	constructor (delayTime: number = 0.5, feedbackTime: number = 0.8) {
		this.input = this.context.createConvolver();
	}

	getInput(): AudioNode {
		return this.input;
	}

	connect(node: AudioNode): AudioNode {
	    this.input.connect(node);
	    return node;
	}

	disconnect(): void {
		this.input.disconnect();
	}
}
