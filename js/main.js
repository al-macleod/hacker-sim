import { Terminal } from './terminal.js';

document.addEventListener('DOMContentLoaded', () => {
  const terminal = new Terminal();
  terminal.init();
  
  // Focus terminal input
  document.getElementById('terminal-input').focus();
  
  // Keep terminal input focused
  document.addEventListener('click', () => {
    document.getElementById('terminal-input').focus();
  });
});
