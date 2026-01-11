const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchMeals = async (term) => {
  const response = await fetch(`${BASE_URL}/search.php?s=${term}`);
  const data = await response.json();
  return data.meals;
};

export const getMealById = async (id) => {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals ? data.meals[0] : null;
};

export const getRandomMeal = async () => {
  const response = await fetch(`${BASE_URL}/random.php`);
  const data = await response.json();
  return data.meals ? data.meals[0] : null;
};

export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories.php`);
  const data = await response.json();
  return data.categories;
};

export const filterByCategory = async (category) => {
    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals;
};
