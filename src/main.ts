import { Audio } from './audio.ts';
import { Synth } from './synth.ts';
import { QuertyController } from './querty-controller.ts';
import { Delay } from './delay.ts';

declare let nx: any;
declare let matrix1: any;
declare let select1: any;
declare let keyboard1: any;

let s: Synth = new Synth();
let querty: QuertyController = new QuertyController();
let d: Delay = new Delay();

querty.connect(s);

s.connect(Audio.getInstance().context.destination);
s.connect(d.getInput());
d.connect(Audio.getInstance().context.destination);

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