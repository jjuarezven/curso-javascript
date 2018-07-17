import Search from './models/Search';
import * as searchView from './views/searchView';
// cuando no hay un default definido en el modulo, se necesitan las llaves
import { elements, renderLoader, clearLoader } from './views/base';
const state = {};

const controlSearch = async() => {
    const query = searchView.getInput();
    if (query) {
        state.search = new Search(query);
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        await state.search.getResults();
        clearLoader();
        searchView.renderResults(state.search.resultadoPromesa);
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