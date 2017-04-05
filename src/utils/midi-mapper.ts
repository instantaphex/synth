export class MidiMapper {
  public midiToFrequency (midi: number, tuning: number = 440) {
    return Math.pow(2, (midi - 69) / 12) * tuning;
  }
}
