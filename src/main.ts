import { Audio } from './core/audio.ts';
import { TestSynth } from './instruments/test-synth.ts';
import { BufferStore } from './core/buffer-store.ts';
let responses = new BufferStore();
let synth = new TestSynth();

responses.addBuffers({hall: '/assets/impulse-responses/irHall.ogg'}).then(() => {
  synth.connect(Audio.getInstance().context.destination);
});



/* declare let nx: any;
declare let matrix1: any;
declare let select1: any;
declare let keyboard1: any; */

/*nx.onload = () => {
  nx.colorize('#00CCFF');

  matrix1.sequence(120);

  select1.on('*', (val: any) => s.wave = val.text);
  keyboard1.on('*', (val: any) => {
  	console.log(val);
  	if (val.on > 0) {
  		s.play(val.note);
  	} else {
  		s.stop(val.note);
  	}
  });
  matrix1.on('*', (val: any) => {
  	if (!val.list) return;

  	for (let i = 0; i < val.list.length; i++) {
      let idx = Math.abs(i - val.list.length);
  		if (val.list[i]) {
		  	console.log(val);
  			s.play(Math.abs(idx + 50));
  		} else {
  			s.stop(idx + 50);
  		}
  	}
  });
}
*/
