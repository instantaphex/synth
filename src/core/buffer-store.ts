import { Request } from '../utils/request.ts';
type BufferMap = { [name: string]: AudioBuffer; };
type BufferUriMap = { [name: string]: string; };

export class BufferStore {
  private buffers: BufferMap = {} 

  public addBuffers (responses: BufferUriMap): Promise<any> {
    let promises: Promise<AudioBuffer>[] = [];
    for(let name in responses) {
      promises.push(
        Request
          .getAudioBuffer(responses[name])
          .then((b: AudioBuffer) => this.buffers[name] = b)
      );
    }
    return Promise.all(promises);
  }

  public getBufferMap (): BufferMap {
    return this.buffers;
  }

  public getBuffer (name: string): AudioBuffer {
    return this.buffers[name];
  }
}
