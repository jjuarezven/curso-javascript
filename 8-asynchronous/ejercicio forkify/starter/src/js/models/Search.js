import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '1a8c60af377eed92389a5ab7eed3019d';
        try {
            this.resultadoPromesa = (await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`)).data.recipes;
        } catch (error) {
            alert(error);
        }
    }
}