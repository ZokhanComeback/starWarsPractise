const links = [...document.querySelectorAll('.sw-movies__link')];
const loader = document.querySelector('#loader');

for (const l of links) {
  l.addEventListener('click', () => {
    if (
      loader
    ) {
      loader.style.display = 'inline-block'
    }
  })
}
