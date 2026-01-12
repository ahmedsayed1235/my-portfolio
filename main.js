const toggle = document.getElementById('darkToggle'); 
    const html = document.documentElement; 
 
    toggle.addEventListener('change', function () { 
      if (toggle.checked) { 
        html.classList.add('dark'); 
        localStorage.setItem('theme', 'dark'); 
      } else { 
        html.classList.remove('dark'); 
        localStorage.setItem('theme', 'light'); 
      } 
    }); 
    // Load saved theme 
    if (localStorage.getItem('theme') === 'dark') { 
      html.classList.add('dark'); 
      toggle.checked = true; 
    }