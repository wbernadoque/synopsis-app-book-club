module.exports = function() {
  const section = document.querySelector('#body');
  section.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};
