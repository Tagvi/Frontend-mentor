import { switcher } from './index.js';

const changeThemeButton = () => {
  if (document.body.className === 'light') {
    switcher.innerHTML = `<a href="#" class="theme-switcher">
    <ion-icon name="Moon-outline"></ion-icon>
    Dark mode
  </a>`;
  } else {
    switcher.innerHTML = `<a href="#" class="theme-switcher">
    <ion-icon name="sunny-outline"></ion-icon>
    Light mode
  </a>`;
  }
};
const changeTheme = () => {
  if (document.body.className === 'light') {
    document.body.className = 'dark';
  } else {
    document.body.className = 'light';
  }
  changeThemeButton();
  localStorage.setItem('theme', document.body.className);
};
export { changeThemeButton, changeTheme };
