import './style.css';
import { fromEvent, interval, merge, EMPTY } from 'rxjs';
import { switchMapTo, take, takeWhile, takeUntil, switchMap, repeat, mergeMap, repeatWhen, concatMap, scan, mapTo, startWith, tap } from 'rxjs/operators';


const startBtn = document.querySelector('#startBtn');
const stopBtn = document.querySelector('#stopBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const counterDisplayHeader = document.querySelector('h3');

const startClick$ = fromEvent(startBtn, 'click');
const stopClick$ = fromEvent(stopBtn, 'click');
const pauseBtn$ = fromEvent(pauseBtn, 'click');
const interval$ = interval(1000);



const startValue = 200;

merge(
    startClick$.pipe(mapTo(true)),
    pauseBtn$.pipe(mapTo(false))
  )
    .pipe(
      switchMap(val => (val ? interval(10) : EMPTY)),
      mapTo(-1),
      scan((acc: number, curr: number) => acc + curr, startValue),
      takeWhile(val => val >= 0),
      startWith(startValue),
      takeUntil(stopClick$),
      repeat(),
    )
    .subscribe(val => {
      counterDisplayHeader.innerHTML = val.toString();
    });
