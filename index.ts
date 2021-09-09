
import { fromEvent } from 'rxjs';
import { scan, tap, mapTo, debounceTime, filter } from 'rxjs/operators';

const s1 = fromEvent(document, 'mousemove');

let counter = 0;

s1.pipe(
  tap(() => {
    document.body.style.backgroundColor = 'white';
  }),
  debounceTime(300),
  tap(console.log),
  filter((ev: any) => ev.clientX > 200 && ev.clientY > 200),
  mapTo(1),
  scan((acc:number, curr: number) => {
    return acc + curr;
  }, 0)
).subscribe((val: any) => {
  document.querySelector('#counter').innerHTML = `You reached ${val} times`;
  document.body.style.backgroundColor = 'green';
});
