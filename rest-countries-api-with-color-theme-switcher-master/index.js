// toggle Filter options
const filters = document.querySelector(".filters"),
  options = document.querySelector(".options"),
  select = document.querySelector(".select"),
  search = document.querySelector(".search-box input");
select.addEventListener("click", () => {
  options.classList.toggle("hidden");
});
// Fetch the countries
//https://restcountries.eu/rest/v2/all
async function showcountries(url) {
  const response = await fetch(url);
  const responseData = await response.json();
  return responseData;
}
showcountries(
  "https://restcountries.eu/rest/v2/all?fields=name;capital;flag;population;region"
)
  .then((data) => displayCountries(data).then(moreInfo()))
  .catch((err) => console.log(err));
// Display the countries
const displayCountries = async (data) => {
  data.forEach((country) => {
    // toLocaleString() actually adds a comma every 3 digits (couldn't that write inside the string)
    //Some country names come with useless text indide parentheses so the regex below removes them
    const container = `
    <div class="container">
        <img src="${country.flag}" alt = "${
      country.name
    } flag" loading="lazy" />
        <div class="info">
            <h2>${country.name.replace(/ *\([^)]*\) */g, "")}</h2>
            <p class="population">Population: <span>${country.population.toLocaleString()}</span></p>
            <p class="region">Region: <span>${country.region}</span></p>
            <p class="capital">Capital: <span>${country.capital}</span></p>
        </div>
    </div>
    `;
    document.querySelector(".countries").innerHTML += container;
  });
};
//filter by search (country name)

const removeAllHiddenCountries = () => {
  document.querySelectorAll(".container.hidden").forEach((hiddencountry) => {
    hiddencountry.classList.remove("hidden");
  });
};
search.addEventListener("keydown", () => {
  //get the search input
  const filter = document
      .querySelector(".search-box input")
      .value.toLowerCase(),
    countries = document.querySelectorAll(".container");
  // unhide all elements
  removeAllHiddenCountries();
  countries.forEach((country) => {
    //hide elements
    let countryname = country.querySelector("h2").textContent.toLowerCase();
    if (countryname.indexOf(filter) === -1) {
      // you would need 2 backspaces after 1 letter left in the searchbox to reset so I fixed it
      if (filter.length === 1) {
        country.classList.add("hidden");
        removeAllHiddenCountries();
      } else {
        country.classList.add("hidden");
      }
    }
  });
});

//filter by region
options.addEventListener("click", (e) => {
  const filter = e.target.textContent.toLowerCase(),
    countries = document.querySelectorAll(".container");

  removeAllHiddenCountries();
  countries.forEach((country) => {
    //hide elements
    let region = country
      .querySelector(".region span")
      .textContent.toLowerCase();
    if (region.indexOf(filter) === -1) {
      country.classList.add("hidden");
    }
  });
});
//clear filters
document.querySelector(".clear").addEventListener("click", () => {
  removeAllHiddenCountries();
});
//If user has swiched the theme before it loads it.
window.addEventListener("DOMContentLoaded", () => {
  const theme = window.localStorage.getItem("theme");
  document.body.className = theme;
});

// Theme switcher
const switcher = document.querySelector(".theme-switcher");
switcher.addEventListener("mousedown", () => {
  if (document.body.className === "light") {
    document.body.className = "dark";
    switcher.innerHTML = `<a href="#" class="theme-switcher">
    <ion-icon name="sunny-outline"></ion-icon>
    Light mode
  </a>`;
    window.localStorage.setItem("theme", "dark");
  } else {
    document.body.className = "light";
    switcher.innerHTML = `<a href="#" class="theme-switcher">
    <ion-icon name="Moon-outline"></ion-icon>
    Dark mode
  </a>`;
    window.localStorage.setItem("theme", "light");
  }
});
const moreInfo = () => {
  let countries = document.querySelectorAll(".container");
  countries.forEach((container) => {
    container.addEventListener("click", () => {
      const name = container.querySelector("h2").textContent;
      showcountries(
        `https://restcountries.eu/rest/v2/name/${name}?fields=name;capital;currencies;nativeName;population;region;subregion;topLevelDomain;languages;flag;borders`
      )
        .then((data) => {
          displayMoreInfo(data);
        })
        .catch((err) => console.log(err));
    });
  });
};
const displayMoreInfo = (data) => {
  data = data[0];
  //currencies come in an array so I had to do this
  let currencies = [];
  data.currencies.forEach((currency) => {
    let name = ` ${currency.name}`;
    currencies.push(name);
  });
  // Uses singular form if there is only one currency
  let currenciesText;
  if (currencies.length === 1) {
    currenciesText = "Currency: ";
  } else {
    currenciesText = "Currencies: ";
  }

  let languages = [];
  data.languages.forEach((lang) => {
    let name = ` ${lang.name}`;
    languages.push(name);
  });

  let languagesText;

  if (languages.length === 1) {
    languagesText = "Language: ";
  } else {
    languagesText = "Languages: ";
  }
  //wrappers below are used for desktop version
  const country = `
    <p class="back">
      <ion-icon name="arrow-back-outline"></ion-icon>
      Back
    </p>
    <div class="wrapper">
      <img src="${data.flag}" alt="${data.name} flag">
      <div class="wrapper-2">
        <h1>${data.name.replace(/ *\([^)]*\) */g, "")}</h1>
        <div class="extra-info">
          <div class="wrapper-3">
            <p>Native name: <span>${data.nativeName}</span></p>
            <p>Population: <span>${data.population.toLocaleString()}</span></p>
            <p>Region: <span>${data.region}</span></p>
            <p>Sub region: <span>${data.subregion}</span></p>
            <p class="mb">Capital: <span>${data.capital}</span></p>
          </div>
          <div class="wrapper-4">
            <p>Top level domain: <span>${data.topLevelDomain}</span></p>
            <p>${currenciesText}<span>${currencies.join(", ")}</span></p>
            <p>${languagesText} <span>${languages.join(", ")}</span></p>
          </div>
        </div>
        <div class="wrapper-5">
          <h2>Border Countries: </h2>
          <div class="bordercountries"></div>
        </div>
      </div>
    </div>
  `;
  const countryElem = document.createElement("div");
  countryElem.className = "extrainfo";
  countryElem.innerHTML = country;
  document.querySelectorAll(".container, .filters").forEach((container) => {
    container.classList.add("hidden");
  });
  document.body.appendChild(countryElem);
  //the code grabs the bordering countries which returns countrycodes and then fetches the names
  data.borders.forEach((code) => {
    showcountries(`https://restcountries.eu/rest/v2/alpha/${code}?fields=name`)
      .then((data) => {
        const button = document.createElement("button");
        button.textContent = data.name.replace(/ *\([^)]*\) */g, "");
        button.addEventListener("click", () => {
          showcountries(
            `https://restcountries.eu/rest/v2/name/${button.textContent}?fields=name;capital;currencies;nativeName;population;region;subregion;topLevelDomain;languages;flag;borders`
          )
            .then((data) => {
              document.querySelector(".extrainfo").remove();
              displayMoreInfo(data);
            })
            .catch((err) => console.log(err));
        });
        document.querySelector(".bordercountries").appendChild(button);
      })
      .catch((err) => console.log(err));
  });
  document.querySelector(".back").addEventListener("click", () => {
    document.querySelector(".extrainfo").remove();
    document.querySelectorAll(".container, .filters").forEach((container) => {
      container.classList.remove("hidden");
    });
  });
};
