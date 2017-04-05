import { OscillatorType } from '../types/oscillator-type.ts';

export class Audio {
    private static instance: Audio = new Audio();

    public context: AudioContext;
    public id: number;

    constructor() {
        if (Audio.instance) {
            throw new Error("Error - use Audio.getInstance()");
        }
        this.context = new AudioContext();
        this.id = Math.random();
    }

    static getInstance(): Audio {
        Audio.instance = Audio.instance || new Audio();
        return Audio.instance;
    }

    public createGain(): GainNode {
        return Audio.getInstance().context.createGain();
    }

    public createOscillator(type: OscillatorType): OscillatorNode {
        let osc = Audio.getInstance().context.createOscillator();
        osc.type = type;
        return osc;
    }

}

