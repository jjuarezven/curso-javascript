import axios from 'axios';
import {key, proxy} from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {        
        try {
            this.resultadoPromesa = (await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`)).data.recipes;
        } catch (error) {
            alert(error);
        }
    }
}