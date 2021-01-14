import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView, { RecipeView } from './views/recipeView.js';
import searchView, { SearchView } from './views/searchView.js';
import resultsView, { ResultsView } from './views/resultsView.js';
import paginationView, { PaginationView } from './views/PaginationView.js';
// console.log(paginationView);

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //1. Loading Recipe.
    await model.loadRecipe(id);
    const recipe = model.state.recipe;

    //2. Rendering recipe.
    recipeView.render(recipe);
  } catch (err) {
    recipeView.rendorError(`${err} This is User defined error message`);
  }
};
//search result

const controlSearchResult = async function () {
  try {
    resultsView.renderSpinner();
    //1.Get Search query
    const query = searchView.getQuery();
    if (!query) return;

    //2.Load Search results
    await model.loadSearchResult(query);

    //3.Render Results
    resultsView.render(model.getSearchResultsPage(2));

    //4.Render Initial results
    paginationView.render(model.state.search);

    // console.log
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  console.log('Page controller');

  resultsView.render(model.getSearchResultsPage(goToPage));

  //4.Render new pagination
  paginationView.render(model.state.search);
};

const newfeature = function () {
  console.log('New Feautre simulation for git');
};

// controlSearchResult('pizza');
searchView.addhandlerSearch(controlSearchResult);

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addhandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  newFeautre();
  console.log('Continuous Integration and Continuous Deployement.');
};

init();
