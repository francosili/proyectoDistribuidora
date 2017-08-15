// Formatea array categories en un array con varios arrays de 9 categoira
// esto pa poder mostrar mejor

export const reformatItems = (cantCategs: number, categoriesCollection) => {
    let categoriesReformated = [];
    let auxNineCategoties = [];
    for (let i=0; i <= categoriesCollection.length; i++) {
        auxNineCategoties.push(categoriesCollection[i])
        if (i === categoriesCollection.length-1 || (i+1) % cantCategs === 0) {
            categoriesReformated.push(auxNineCategoties);
            auxNineCategoties = [];
        }
    }
    return categoriesReformated;
}

export const getItems = (type: string) => {
    if (type === 'categories')
    return this.storageService.getStorage('categories').then(respCat => {
        this.items = respCat;
    })
}