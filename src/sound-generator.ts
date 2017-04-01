export interface SoundGenerator {
	play(note: number): void;
	stop(note: number): void;
	connect(node: AudioNode): void;
}