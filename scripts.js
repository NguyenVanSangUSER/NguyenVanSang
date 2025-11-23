(function(){
  // Year update
  var yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme handling
  var root = document.documentElement;
  var stored = localStorage.getItem('site-theme');
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  function applyTheme(theme){
    if(theme === 'light'){
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
    localStorage.setItem('site-theme', theme);
  }

  var initial = stored || (prefersDark ? 'dark' : 'light');
  // normalize: if not 'light', treat as dark
  initial = initial === 'light' ? 'light' : 'dark';
  applyTheme(initial);

  var toggle = document.getElementById('theme-toggle');
  if(toggle){
    toggle.addEventListener('click', function(){
      var current = document.body.classList.contains('light') ? 'light' : 'dark';
      var next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      // small accessible announce via aria-pressed
      toggle.setAttribute('aria-pressed', next === 'light');
    });
  }

  // Copy email button
  var copyBtn = document.getElementById('copy-email');
  var emailLink = document.getElementById('email-link');
  if(copyBtn && emailLink){
    copyBtn.addEventListener('click', function(){
      var email = emailLink.textContent.trim();
      if(!email) return;
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(email).then(function(){
          var prev = copyBtn.textContent;
          copyBtn.textContent = 'Copied!';
          setTimeout(function(){ copyBtn.textContent = prev; }, 1500);
        }).catch(function(){ fallbackCopy(email); });
      } else {
        fallbackCopy(email);
      }
    });
  }
  function fallbackCopy(text){
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select();
    try{ document.execCommand('copy');
      var prev = copyBtn.textContent; copyBtn.textContent = 'Copied!';
      setTimeout(function(){ copyBtn.textContent = prev; },1500);
    }catch(e){}
    document.body.removeChild(ta);
  }

  // Smooth scroll for anchor links
  document.addEventListener('click', function(e){
    var el = e.target;
    if(el.tagName === 'A' && el.getAttribute('href') && el.getAttribute('href').startsWith('#')){
      var id = el.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
  });

})();
