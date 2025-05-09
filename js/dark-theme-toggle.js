// Dark theme toggle script for Salon o Female
(function() {
  function setDarkTheme(enabled) {
    document.body.classList.toggle('dark-theme', enabled);
    localStorage.setItem('darkTheme', enabled ? '1' : '0');
  }

  function createToggleButton() {
    if (document.getElementById('darkThemeToggle')) return;
    var btn = document.createElement('button');
    btn.id = 'darkThemeToggle';
    btn.title = 'Toggle dark mode';
    btn.innerHTML = '🌙';
    btn.onclick = function() {
      var enabled = !document.body.classList.contains('dark-theme');
      setDarkTheme(enabled);
      btn.innerHTML = enabled ? '☀️' : '🌙';
    };
    document.body.appendChild(btn);
    // Set initial icon
    btn.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
  }

  // On page load, set theme from localStorage
  document.addEventListener('DOMContentLoaded', function() {
    setDarkTheme(localStorage.getItem('darkTheme') === '1');
    createToggleButton();
  });
})();
