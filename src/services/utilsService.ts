// Formatea array categories en un array con varios arrays de 9 categoira
// esto pa poder mostrar mejor

export const reformatCategories = (cantCategs: number, categoriesCollection) => {
    let categoriesReformated = [];
    let auxNineCategoties = [];
    for (let i=0; i <= categoriesCollection.length; i++) {
        auxNineCategoties.push(categoriesCollection[i])
        if (i === categoriesCollection.length-1 || (i+1) % cantCategs === 0) {
            categoriesReformated.push(auxNineCategoties);
            auxNineCategoties = [];
        }
    }
    console.log(categoriesReformated);

    return categoriesReformated;
}