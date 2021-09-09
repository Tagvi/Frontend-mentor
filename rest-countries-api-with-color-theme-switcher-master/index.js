import { changeThemeButton, changeTheme } from './theme.js';
import { displayCountries, displayMoreInfo, showAllCountries } from './dom.js';

const qs = (elem) => document.querySelector(elem);
const qsAll = (elems) => document.querySelectorAll(elems);
const [options, select, search, clear, switcher, container] = [
  '.options',
  '.select',
  '.search-box input',
  '.clear',
  '.theme-switcher',
  '.countries',
].map((elem) => qs(elem));
const fetchData = async (url) => {
  const response = await fetch(url);
  const responseData = await response.json();
  return responseData;
};
const theme = localStorage.getItem('theme') || 'dark';
document.body.className = theme;
localStorage.setItem('theme', theme);
changeThemeButton();
fetchData(
  'https://rescountries.eu/rest/v2/all?fields=name;capital;flag;population;region'
)
  .then((data) => displayCountries(data))
  .catch((err) => console.log(err));

select.addEventListener(
  'click',
  () => {
    options.classList.toggle('hidden');
  },
  { passive: true }
);

search.addEventListener(
  'input',
  () => {
    const filter = search.value.toLowerCase();
    const countries = qsAll('.container');
    showAllCountries();
    countries.forEach((country) => {
      const countryName = country.querySelector('h2').textContent.toLowerCase();
      if (countryName.indexOf(filter) === -1) {
        country.classList.add('hidden');
        if (filter.length === 1) {
          showAllCountries();
        }
      }
    });
  },
  { passive: true }
);

options.addEventListener(
  'click',
  ({ target }) => {
    const filter = target.textContent.toLowerCase();
    const countries = qsAll('.container');

    showAllCountries();
    countries.forEach((country) => {
      // hide elements
      const region = country
        .querySelector('.region span')
        .textContent.toLowerCase();
      if (region.indexOf(filter) === -1) {
        country.classList.add('hidden');
      }
    });
  },
  { passive: true }
);
// clear filters
clear.addEventListener(
  'click',
  () => {
    showAllCountries();
  },
  { passive: true }
);

switcher.addEventListener('click', changeTheme, { passive: true });

container.addEventListener(
  'click',
  ({ target }) => {
    const countryContainer = target.closest('.container');
    if (!countryContainer) return;
    const name = countryContainer.querySelector('h2').textContent;
    fetchData(
      `https://restcountries.eu/rest/v2/name/${name}?fields=name;capital;currencies;nativeName;population;region;subregion;topLevelDomain;languages;flag;borders`
    )
      .then((data) => {
        displayMoreInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  { passive: true }
);

export { fetchData, qs, qsAll, container, switcher };
