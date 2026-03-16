// === CONFIGURACIÓN DE SUPABASE ===
// ¡IMPORTANTE! Reemplaza estos valores con los de tu proyecto en Supabase (Settings -> API)
const SUPABASE_URL = 'TU_URL_DE_SUPABASE'; 
const SUPABASE_ANON_KEY = 'TU_ANON_KEY_DE_SUPABASE';

let supabase = null;

// Inicializar Supabase si las claves están puestas
if (SUPABASE_URL !== 'TU_URL_DE_SUPABASE') {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedback-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const message = document.getElementById('message').value;

      status.style.display = 'block';
      status.style.color = 'var(--primary)';
      status.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Enviando a la nube...';
      form.style.opacity = '0.5';
      form.style.pointerEvents = 'none';

      try {
        if (!supabase) {
          throw new Error('Supabase no está configurado. Revisa script.js');
        }

        // --- ENVIAR A SUPABASE ---
        const { error } = await supabase
          .from('mejoras')
          .insert([{ name, message, created_at: new Date() }]);

        if (error) throw error;

        status.innerHTML = `¡Gracias, ${name}! Tu idea se ha guardado en la nube. ✨`;
        status.style.color = '#4ade80';
        form.reset();
      } catch (err) {
        console.error(err);
        status.innerHTML = `❌ Error: ${err.message || 'No se pudo enviar'}`;
        status.style.color = '#f87171';
      } finally {
        form.style.opacity = '1';
        form.style.pointerEvents = 'auto';
      }
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
