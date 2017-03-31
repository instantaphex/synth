import { Synth } from './synth.ts';
import { Keyboard } from './keyboard.ts';

declare let nx: any;
declare let matrix1: any;
declare let select1: any;
declare let keyboard1: any;

let s: Synth = new Synth();
let k: Keyboard = new Keyboard(s);

nx.onload = () => {
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
