import { timer, fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { switchMap, mergeMap, takeUntil, tap, repeat } from 'rxjs/operators';
import './style.css';

const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resultEl = document.querySelector('#result');

const start$ = fromEvent(startButton, 'click');
const stop$ = fromEvent(stopButton, 'click');


start$
    .pipe(
        switchMap(() => timer(0, 5000)),
        switchMap(() => ajax.getJSON('https://api.thecatapi.com/v1/images/search')),
        takeUntil(stop$),
        repeat()
    )
    .subscribe(response => {        
        resultEl.innerHTML = response[0].url;
    })



