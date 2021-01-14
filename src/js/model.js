import { search } from 'core-js/fn/symbol';
import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
};


export const loadRecipe = async function (id) {
  try {
    const res = await getJSON(`${API_URL}/${id}`);

    const { recipe } = res.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_URL,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error('Error in loading the recipe from API in model');
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const response = await getJSON(`${API_URL}?search=${query}`);
    state.search.result = response.data.recipes.map(rec => {
      console.log('-----------loadSearchResult---------',state.search.result);
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        imageURL: rec.image_url,
      };
    });
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = function (page) {
  state.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.result.slice(start, end);
};
