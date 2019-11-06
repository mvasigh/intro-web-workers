import createBounce from './bounce';
import fib from './fib';

const form = document.getElementById('input-form');
const input = document.getElementById('input');
const display = document.getElementById('display');
const canvas = document.getElementById('canvas');

const bounce = createBounce(canvas);

form.addEventListener('submit', e => {
  e.preventDefault();
  display.textContent = 'Calculating...';
  const value = input.valueAsNumber;
  const startTime = performance.now();

  // ! This code is blocking! 🚨 Fix it with a Web Worker
  const result = fib(value);

  const endTime = performance.now();
  const time = (endTime - startTime).toFixed(2);
  display.textContent = `Done! Result: ${result}, Time: ${time} ms`;
  input.value = '';
});

bounce();
