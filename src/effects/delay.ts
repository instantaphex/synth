import { Audio } from '../core/audio.ts';
import { AudioEffect } from './audio-effect.ts';

export class Delay implements AudioEffect {
	public input: DelayNode;
	public feedback: GainNode;

	private context = Audio.getInstance().context;

	constructor (delayTime: number = 0.5, feedbackTime: number = 0.8) {
		this.input = this.context.createDelay();
	    this.input.delayTime.value = delayTime; 

	    this.feedback = this.context.createGain();
	    this.feedback.gain.value = feedbackTime;
	    
	    this.createFeedbackLoop();
	}

	public getInput(): AudioNode {
		return this.input;
	}

	public connect(node: AudioNode): AudioNode {
	    this.input.connect(node);
	    return node;
	}

	public disconnect(): void {
		this.input.disconnect();
	}

	private createFeedbackLoop (): void {
	    this.input.connect(this.feedback);
	    this.feedback.connect(this.input);
	}
}
