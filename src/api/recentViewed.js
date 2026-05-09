const RECENT_VIEWED_KEY = "recentViewedProducts";
const MAX_RECENT_VIEWED_COUNT = 10;

export const getRecentViewedProducts = () => {
  try {
    return JSON.parse(localStorage.getItem(RECENT_VIEWED_KEY)) ?? [];
  } catch {
    return [];
  }
};

export const addRecentViewedProduct = (product) => {
  const recentProducts = getRecentViewedProducts();
  const nextProducts = [
    {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      note: product.note,
    },
    ...recentProducts.filter((item) => item.id !== product.id),
  ].slice(0, MAX_RECENT_VIEWED_COUNT);

  localStorage.setItem(RECENT_VIEWED_KEY, JSON.stringify(nextProducts));
};
