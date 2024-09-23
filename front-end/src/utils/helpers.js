export const windowsSize = () => {
  const width = window.innerWidth;

  if (width <= 576) {
    return 'x-small';
  }
  if (width > 576 && width <= 768) {
    return 'small';
  }
  if (width > 768 && width <= 1024) {
    return 'medium';
  }
  if (width > 1024 && width <= 1440) {
    return 'large';
  }
  if (width > 1440) {
    return 'x-large';
  }
};
