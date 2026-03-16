document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedback-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const message = document.getElementById('message').value;

      // Simulate sending data
      status.style.display = 'block';
      status.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Enviando...';
      form.style.opacity = '0.5';
      form.style.pointerEvents = 'none';

      setTimeout(() => {
        status.innerHTML = `¡Gracias, ${name}! Tu idea ha sido recibida y será revisada pronto. ✨`;
        status.style.color = '#4ade80';
        form.reset();
        form.style.opacity = '1';
        form.style.pointerEvents = 'auto';
      }, 1500);
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
