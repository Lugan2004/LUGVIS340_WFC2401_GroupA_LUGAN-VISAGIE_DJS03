// theme.js

export const theme = {
  isDarkMode: null,
  darkThemeVars: {
    colorDark: '255, 255, 255',
    colorLight: '10, 10, 20',
  },
  lightThemeVars: {
    colorDark: '10, 10, 20',
    colorLight: '255, 255, 255',
  },

  init() {
    // eslint-disable-next-line prettier/prettier
      this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme();
  },

  setTheme() {
    const { colorDark, colorLight } = this.isDarkMode
      ? this.darkThemeVars
      : this.lightThemeVars;
    document.documentElement.style.setProperty('--color-dark', colorDark);
    document.documentElement.style.setProperty('--color-light', colorLight);
    document.querySelector('[data-settings-theme]').value = this.isDarkMode
      ? 'night'
      : 'day';
  },

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.setTheme();
  },
};
