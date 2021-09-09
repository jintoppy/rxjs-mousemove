import './style.css';
import { fromEvent } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

function getScrollPercent() {
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

const scroll$ = fromEvent(document, 'scroll');

const scrollPercentage$ = scroll$
                            .pipe(
                                map(() => getScrollPercent())
                            );


scrollPercentage$.subscribe(val => {        
    (document.querySelector('#scroller') as HTMLSpanElement).style.width = `${val}%`;
});

scrollPercentage$.subscribe(val => {        
    document.querySelector('header').style.display = 'none';
    if(val === 0 ){
        document.querySelector('header').style.display = 'block';
    }
});
    

