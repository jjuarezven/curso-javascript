import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
// cuando no hay un default definido en el modulo, se necesitan las llaves
import { elements, renderLoader, clearLoader } from './views/base';
const state = {};

// #region search controller
const controlSearch = async() => {
    const query = searchView.getInput();
    if (query) {
        state.search = new Search(query);
        searchView.clearInput();
        searchView.clearResults();
        recipeView.clearRecipe();
        renderLoader(elements.searchRes);
        try {
            await state.search.getResults();
            searchView.renderResults(state.search.resultadoPromesa);
        } catch (err) {
            alert('error procesando la busqueda');
        } finally {
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.resultadoPromesa, goToPage);
    }
});
// #endregion

//#region recipe controller
const controlRecipe = async() => {
    const id = window.location.hash.replace('#', '');
    if (id) {
        recipeView.clearRecipe();
        if(state.search) {
            searchView.highlightSelected(id);
        }
        renderLoader(elements.recipe);
        state.recipe = new Recipe(id);        
        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            state.recipe.calcTime();
            state.recipe.calcServings();
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (err) {
            alert(err);
        }
    }
};

/* window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe); */
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

elements.recipe.addEventListener('click', e=>{
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }
    else {
        if (e.target.matches('.btn-increase, .btn-increase *')) {
            state.recipe.updateServings('inc');
            recipeView.updateServingsIngredients(state.recipe);
        }
        else{
            if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
                controlList();
            }
        }
    }
});


//#endregion

//#region list controller
const controlList = () =>{
    if (!state.list) {
        state.list = new List();
    }
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};

elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
        listView.deleteItem(id);
    }
    else {
        if (e.target.matches('.shopping__count-value')) {
            const val = parseFloat(e.target.value);
            state.list.updateCount(id, val);
        }
    }
});
//#endregion