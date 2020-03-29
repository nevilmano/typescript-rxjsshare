import { timer, of, from, interval, defer } from 'rxjs';
import { tap, mapTo, share, publish, refCount, delay, take } from 'rxjs/operators';



/* const source = interval(2000).pipe(
  tap((value) => {
    console.log('INTERVAL EMITING' , value)}),
  take(5)
); */

const example = defer(() => {
  console.log('DEFER SUBSCRIBED' , new Date().toISOString().slice(-7));
  return of(Math.floor(Math.random() * 100))
}).pipe(
  delay(3000),
  tap((value) => {
    console.log('EXAMPLE EMITING' , value)}),
    publish(),
    refCount()
);

const observer = (name: string) => {
  return {
    next: (value: number) => console.log(`observer ${name}: ${value}`),
    complete: () => console.log(`observer ${name}: complete`)
  };
}
example.subscribe( observer('a'));
example.subscribe( observer('b'));



let update = () => {
   console.log('update called');
  example.subscribe( observer('c'));
  example.subscribe( observer('d'));
 } 

 let updateEL : HTMLElement = document.getElementById('upd');
 updateEL.addEventListener('click' , ()=> update());