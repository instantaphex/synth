export interface AudioEffect {
  getInput: () => AudioNode;
  connect: (node: AudioNode) => AudioNode;
  disconnect: () => void;
}
