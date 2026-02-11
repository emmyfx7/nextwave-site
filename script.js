document.addEventListener('DOMContentLoaded', function () {
  // =========================
  // EMAILJS FORM HANDLER
  // =========================
  emailjs.init('TayoSSdmma3qIagyC');

  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    const submitBtn = contactForm.querySelector('button');

    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showMessage('Please fill in all fields.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      const templateParams = { from_name: name, from_email: email, message: message };

      try {
        await emailjs.send('service_7vcqsfn', 'template_7rjptqk', templateParams);
        showMessage('Message sent successfully! We’ll get back to you shortly.', 'success');
        contactForm.reset();
      } catch (error) {
        console.error(error);
        showMessage('Something went wrong. Please try again later.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  }

  function showMessage(text, type) {
    if (!formMessage) return;
    formMessage.textContent = text;
    formMessage.className = 'form-message show';

    if (type === 'error') {
      formMessage.style.backgroundColor = '#fee2e2';
      formMessage.style.color = '#dc2626';
    } else if (type === 'success') {
      formMessage.style.backgroundColor = '#dcfce7';
      formMessage.style.color = '#16a34a';
    } else {
      formMessage.style.backgroundColor = '#e0f2fe';
      formMessage.style.color = '#0369a1';
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // =========================
  // DARK / LIGHT THEME TOGGLE
  // =========================
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') document.body.classList.add('dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  // =========================
  // SCROLL REVEAL ANIMATIONS
  // =========================
  const scrollElements = document.querySelectorAll('.feature, .about h2, .contact h2');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.15 });

  scrollElements.forEach(el => observer.observe(el));

  // =========================
  // NAVBAR ACTIVE LINK TRACKING
  // =========================
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (pageYOffset >= sectionTop) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  });

  // =========================
  // FAQ ACCORDION
  // =========================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('h3');
    const answer = item.querySelector('p');

    // Set initial display to none
    answer.style.display = 'none';

    // Make question focusable for keyboard
    question.setAttribute("tabindex", "0");

    // Click to toggle
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all FAQ items
      faqItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('p').style.display = 'none';
      });

      // Open this one if it was closed
      if (!isOpen) {
        item.classList.add('open');
        answer.style.display = 'block';
      }
    });

    // Keyboard accessibility: Enter / Space
    question.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        question.click();
      }
    });
  });
});
