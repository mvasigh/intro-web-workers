export default function asyncFib(num) {
  // We want a function that returns a Promise that resolves to the answer
  return new Promise((resolve, reject) => {
    // Instantiate the worker
    const worker = new Worker('./fib.worker.js');

    // Create our message event handler
    const handleMessage = e => {
      worker.removeEventListener('message', handleMessage)
      worker.removeEventListener('error', handleError)
      worker.terminate();
      resolve(e.data);
    }

    // Create our error event handler
    const handleError = err => {
      worker.removeEventListener('message', handleMessage)
      worker.removeEventListener('error', handleError)
      worker.terminate();
      reject(err);
    }

    // Mount our listeners
    worker.addEventListener('message', handleMessage)
    worker.addEventListener('error', handleError);
  
    // Post the message to the worker
    worker.postMessage(num);
  })
}

