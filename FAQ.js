const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');

  question.addEventListener('click', () => {

    // optional: hanya 1 terbuka
    faqItems.forEach(i => {
      if(i !== item) i.classList.remove('active');
    });

    item.classList.toggle('active');
  });
});