import './style.css';
import { fromEvent, interval, merge, empty } from 'rxjs';
import { switchMapTo, take, takeWhile, takeUntil, switchMap, concatMap, scan, mapTo, startWith, tap } from 'rxjs/operators';
import { EMPTY_OBSERVER } from 'rxjs/dist/types/internal/Subscriber';


const startBtn = document.querySelector('#startBtn');
const stopBtn = document.querySelector('#stopBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const counterDisplayHeader = document.querySelector('h3');

const startClick$ = fromEvent(startBtn, 'click');
const stopClick$ = fromEvent(stopBtn, 'click');
const pauseBtn$ = fromEvent(pauseBtn, 'click');
const interval$ = interval(1000);



const startValue = 5;

merge(startClick$.pipe(mapTo(true)), pauseBtn$.pipe(mapTo(false)))
.pipe(
    tap(val => {
        console.log(val);
    }),
    switchMap((val) => val ? interval(1000)
    .pipe(          
        mapTo(-1),
        scan((acc: number, curr: number) => acc + curr, startValue),         
        takeWhile(val => val >= 0),
        takeUntil(stopClick$),
        startWith(startValue)
    )    
    : empty())    
)
.subscribe(val => {
    console.log(val);    
    counterDisplayHeader.innerHTML = val;
});
