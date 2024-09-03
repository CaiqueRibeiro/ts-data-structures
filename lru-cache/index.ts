import { LRUCache } from "./lru-cache";

/*
    It's possible to define a data structure to be set as the values of the LRU Cache or inform a builtin JS structure.
    The keys will always be strings.
*/
type UserInformations = {
    id: string;
    name: string;
    profession: string;
    age: number;
}

/* The max items in cache can be defined. In case it's not informed, it will have 20 items */
const CACHE_MAX_ITEMS = 3;

const lru = new LRUCache<UserInformations>(CACHE_MAX_ITEMS);

const data1: UserInformations = {
    id: '01b04048-8c93-404e-93ba-b2abdfced22a',
    name: 'John Doe',
    profession: 'Software Engineer',
    age: 30,
}

const data2: UserInformations = {
    id: '840ef6ad-79f6-4179-bb12-96ab7cc99357',
    name: 'Maria Scatta',
    profession: 'Product Manager',
    age: 32,
}

const data3: UserInformations = {
    id: '067bbc4f-ea18-4b38-8eed-b4ddeadf4e38',
    name: 'Joseph Climber',
    profession: 'Intern',
    age: 19,
}

const data4: UserInformations = {
    id: '4b914943-9cf7-477a-af17-b058af40449e',
    name: 'Antonieta Laureth',
    profession: 'Software Engineer',
    age: 39,
}

lru.set(data1.id, data1);
lru.set(data2.id, data2);
lru.set(data3.id, data3);
lru.set(data4.id, data4);

const itShouldNotBeFound = lru.get(data1.id);
console.log(itShouldNotBeFound); // the first data put in cache shall be removed because of cache length

const itShouldBeFound = lru.get(data2.id);
console.log(itShouldBeFound); // this should have "data2" informations

console.log(`LENGTH: ${lru.length()}`);