import createBounce from './bounce';
import fib from './fib';
import asyncFib from './asyncFib';

const form = document.getElementById('input-form');
const input = document.getElementById('input');
const radios = document.querySelectorAll('input[type="radio"]');
const display = document.getElementById('display');
const canvas = document.getElementById('canvas');

const bounce = createBounce(canvas);

const fibMap = new Map([
  ['sync', fib],
  ['async', asyncFib]
]);

let mode = 'sync';

radios.forEach(radio => {
  radio.addEventListener('change', e => {
    mode = e.target.id;
  });
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  display.textContent = 'Calculating...';
  const value = input.valueAsNumber;
  const startTime = performance.now();
  const handler = fibMap.get(mode);

  let result = handler(value);
  if (result.then) {
    display.textContent = 'Calculating...';
    result = await result;
  }

  const endTime = performance.now();
  const time = (endTime - startTime).toFixed(2);
  display.textContent = `Done! Result: ${result}, Time: ${time} ms`;
  input.value = '';
});

bounce();
