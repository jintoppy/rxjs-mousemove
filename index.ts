import './style.css';

import { filter, fromEvent, from, debounceTime } from 'rxjs';
import { scan, tap, mapTo } from 'rxjs/operators';

const s1 = fromEvent(document, 'mousemove');

let counter = 0;

s1.pipe(
  debounceTime(300),
  tap(console.log),
  filter((ev: any) => ev.clientX > 50 && ev.clientY > 50),
  mapTo(1),
  scan((acc, curr) => {
    console.log('inside scan');
    return acc + curr;
  }, 0)
).subscribe((val: any) => {
  console.log(val);
});
