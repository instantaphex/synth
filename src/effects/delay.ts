import { Audio } from '../core/audio.ts';

export class Delay {
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

	getInput(): AudioNode {
		return this.input;
	}

	connect(node: AudioNode): void {
	    this.input.connect(node);
	}

	private createFeedbackLoop (): void {
	    this.input.connect(this.feedback);
	    this.feedback.connect(this.input);
	}
}