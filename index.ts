import './style.css';
import { fromEvent, interval, timer, Observable } from 'rxjs';
import { scan, tap, mapTo, debounceTime, filter, take, finalize, takeUntil, takeWhile, share, concatMap, switchMap, mergeMap, exhaustMap } from 'rxjs/operators';



// const s1$ = interval(1000);
// const click$ = fromEvent(document.querySelector('button'), 'click');

// click$.pipe(
//   mergeMap(() => s1$.pipe(take(3)))
// )
// .subscribe(val => {
//   console.log(val);
// });


const stream = new Observable(obs => {
  console.log('inside observable function');
  setTimeout(() => {
    obs.next('hi');
  }, 100);

  setTimeout(() => {
    obs.next('hello');
  }, 200);
});

const s1 = stream.pipe(share());

s1.subscribe((val) => {
  console.log('subscription1', val);
});

setTimeout(() => {
  s1.subscribe((val) => {
    console.log('subscription2', val);
  });
}, 150);



// const s2 = timer(0, 5000);

// const s1 = interval(1000).pipe(
//   takeUntil(s2),
//   tap(console.log),
//   finalize(() => {
//     console.log('final operator');
//   })
// );
// s1.subscribe(val => {
//   console.log(val);
// },
// () => {},
// () => {
//   console.log('final');
// }
// )


// const s1 = fromEvent(document, 'mousemove');

// s1.pipe(
//   tap(() => {
//     document.body.style.backgroundColor = 'white';
//   }),
//   debounceTime(300),
//   tap(console.log),
//   filter((ev: any) => ev.clientX > 200 && ev.clientY > 200),
//   mapTo(1),
//   scan((acc:number, curr: number) => {
//     return acc + curr;
//   }, 0)
// ).subscribe((val: any) => {
//   document.querySelector('#counter').innerHTML = `You reached ${val} times`;
//   document.body.style.backgroundColor = 'green';
// });
