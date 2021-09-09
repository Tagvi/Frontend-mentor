import { fetchData, qs, qsAll, container } from './index.js';

const displayCountries = (data) => {
  data.forEach(({ flag, name, population, region, capital }) => {
    const country = `
    <div class="container">
        <img src="${flag}" alt = "${name} flag" loading="lazy" />
        <div class="info">
            <h2>${name.replace(/ *\([^)]*\) */g, '')}</h2>
            <p class="population">Population: <span>${population.toLocaleString()}</span></p>
            <p class="region">Region: <span>${region}</span></p>
            <p class="capital">Capital: <span>${capital}</span></p>
        </div>
    </div>
    `;
    container.innerHTML += country;
  });
};
const showAllCountries = () => {
  qsAll('.container.hidden').forEach((hiddenCountry) => {
    hiddenCountry.classList.remove('hidden');
  });
};

const displayMoreInfo = ([data]) => {
  const {
    flag,
    name,
    nativeName,
    population,
    region,
    subRegion,
    capital,
    topLevelDomain,
    borders,
  } = data;
  let { currencies, languages } = data;

  currencies = currencies.map((currency) => ` ${currency.name}`);
  const currenciesText =
    currencies.length === 1 ? 'Currency: ' : 'Currencies: ';

  languages = languages.map((lang) => ` ${lang.name}`);
  const languagesText = languages.length === 1 ? 'Language: ' : 'Languages: ';

  const country = `
    <p class="back">
      <ion-icon name="arrow-back-outline"></ion-icon>
      Back
    </p>
    <div class="wrapper">
      <img src="${flag}" alt="${name} flag">
      <div class="wrapper-2">
        <h1>${name.replace(/ *\([^)]*\) */g, '')}</h1>
        <div class="extra-info">
          <div class="wrapper-3">
            <p>Native name: <span>${nativeName}</span></p>
            <p>Population: <span>${population.toLocaleString()}</span></p>
            <p>Region: <span>${region}</span></p>
            <p>Sub region: <span>${subRegion}</span></p>
            <p class="mb">Capital: <span>${capital}</span></p>
          </div>
          <div class="wrapper-4">
            <p>Top level domain: <span>${topLevelDomain}</span></p>
            <p>${currenciesText}<span>${currencies.join(', ')}</span></p>
            <p>${languagesText} <span>${languages.join(', ')}</span></p>
          </div>
        </div>
        <div class="wrapper-5">
          <h2>Border Countries: </h2>
          <div class="bordercountries"></div>
        </div>
      </div>
    </div>
  `;
  const countryElem = document.createElement('div');
  countryElem.className = 'extrainfo';
  countryElem.innerHTML = country;
  qsAll('.container, .filters').forEach((elem) => {
    elem.classList.add('hidden');
  });
  document.body.append(countryElem);
  borders.forEach((code) => {
    fetchData(`https://restcountries.eu/rest/v2/alpha/${code}?fields=name`)
      .then(({ name }) => {
        const button = document.createElement('button');
        button.textContent = name.replace(/ *\([^)]*\) */g, '');
        button.addEventListener(
          'click',
          () => {
            fetchData(
              `https://restcountries.eu/rest/v2/name/${button.textContent}?fields=name;capital;currencies;nativeName;population;region;subregion;topLevelDomain;languages;flag;borders`
            )
              .then((data) => {
                qs('.extrainfo').remove();
                displayMoreInfo(data);
              })
              .catch((err) => {
                console.log(err);
              });
          },
          { passive: true }
        );
        qs('.bordercountries').append(button);
      })
      .catch(console.log);
  });
  qs('.back').addEventListener(
    'click',
    () => {
      qs('.extrainfo').remove();
      qsAll('.container, .filters').forEach((container) => {
        container.classList.remove('hidden');
      });
    },
    { passive: true }
  );
};
export { displayCountries, displayMoreInfo, showAllCountries };
