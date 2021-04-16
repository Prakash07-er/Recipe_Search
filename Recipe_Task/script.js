const searchForm = document.querySelector('form');
const searchResult =  document.querySelector('.search-result');
const container = document.querySelector('.container');
let selectQuery ='';



searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    console.log(searchQuery);
    fetchAPI();
});

async function fetchAPI (){
    const APP_ID = '1e2fa5cc';
    const APP_key = '9429417d942f307146c23141390d7a0e';
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=10`;
    const response = await fetch(baseURL); 
    const data = await response.json();
    console.log(data);
    generateHTML(data.hits);

}

function generateHTML (results){
    let showHTML = '';
    results.map(result => {
        showHTML +=
        `
        <div class="item">
        <img src="${result.recipe.image}" alt="">
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a href="${result.recipe.url}"> view recipe</a>
        </div>
        <p class="item-data">calories:${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">health label:${result.recipe.healthLabels}</p>
        <p class="item-data">MealType:${result.recipe.mealType}</p>
        <p class="item-data">ingredientLines:${result.recipe.ingredientLines}</p>
        <p class="item-data">TotalWeight:${result.recipe.totalWeight}</p>
        <p class="item-data"> cuisineType:${result.recipe.cuisineType}</p>

        
    </div>
        `
    })
    searchResult.innerHTML = showHTML;
}
