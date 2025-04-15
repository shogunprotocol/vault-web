// libs/performance-monitor.js
'use client';

let startTimes = {};
let endTimes = {};
let durations = {};

export function startMeasure(label) {
  if (typeof window === 'undefined') return;
  console.log(`🟢 Starting: ${label}`);
  startTimes[label] = performance.now();
}

export function endMeasure(label) {
  if (typeof window === 'undefined' || !startTimes[label]) return;
  endTimes[label] = performance.now();
  durations[label] = endTimes[label] - startTimes[label];
  console.log(`🔴 Finished: ${label} - took ${durations[label].toFixed(2)}ms`);
}

export function reportPerformance() {
  if (typeof window === 'undefined') return;
  console.log('📊 Performance Report:');
  Object.keys(durations).forEach(label => {
    console.log(`${label}: ${durations[label].toFixed(2)}ms`);
  });
  
  // Also log general browser performance metrics
  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    console.log('⏱ Page Load Metrics:');
    console.log(`- DOM loaded: ${timing.domContentLoadedEventEnd - timing.navigationStart}ms`);
    console.log(`- Page loaded: ${timing.loadEventEnd - timing.navigationStart}ms`);
  }
  
  // Report memory usage if available
  if (window.performance && (performance).memory) {
    console.log('💾 Memory Usage:');
    console.log((performance).memory);
  }
}