export const windowsSize = () => {
  const width = window.innerWidth;

  if (width <= 576) {
    return 'xs';
  }
  if (width > 576 && width <= 768) {
    return 's';
  }
  if (width > 768 && width <= 1024) {
    return 'm';
  }
  if (width > 1024 && width <= 1440) {
    return 'l';
  }
  if (width > 1440) {
    return 'xl';
  }
};
