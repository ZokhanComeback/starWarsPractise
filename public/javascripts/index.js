const select = document.querySelector('.sw-movies__select');
const loader = document.querySelector('#loader');

const onInput = () => {
  window.location.href = 'http://localhost:3000/heroes/' + select.value;
  loader.style.display = 'inline-block';
}

select.addEventListener('input', onInput);

