import { Audio } from '../core/audio.ts';

export class Request {
  static getAudioBuffer (url: string): Promise<AudioBuffer> {
		return new Promise((resolve, reject) => {
      let context: AudioContext = Audio.getInstance().context;
			let request = new XMLHttpRequest();
			request.open('GET', url, true);
			request.responseType = 'arraybuffer';
      request.onload = () => {
        context.decodeAudioData(request.response, (buff) => resolve(buff)); 
      }
			request.send();
		});
	}
}
