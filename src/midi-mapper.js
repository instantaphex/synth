export class MidiMapper {
  constructor() {
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

  midiToFrequency (midi, tuning = 440) {
    return Math.pow(2, (midi - 69) / 12) * tuning;
  }

  keyCodeToFrequency (keyCode) {
    return this.midiToFrequency(this.keyMap[keyCode]);
  }
}
