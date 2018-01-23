export const getTabNameForCatalogueScreen = () => 'CatalogueTab';
export const getTabNameForHomeScreen = () => 'HomeTab';
export const getTabNameForShoppingBagScreen = () => 'ShoppingBagTab';

export const getInitialTabName = () => getTabNameForHomeScreen();

const tabs = [
  getTabNameForCatalogueScreen(),
  getTabNameForHomeScreen(),
  getTabNameForShoppingBagScreen()
]; // order matters

export default tabs;
