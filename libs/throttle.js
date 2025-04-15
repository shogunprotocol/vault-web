// libs/utils.js or helpers/throttle.js
export function throttle(callback, limit) {
    let waiting = false;
    return function() {
      if (!waiting) {
        callback.apply(this, arguments);
        waiting = true;
        setTimeout(function() {
          waiting = false;
        }, limit);
      }
    };
  }