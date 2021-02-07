const SearchResult = () => {

    const searchItem = document.getElementById('search-meal').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`)
        .then(response => response.json())
        .then(data => displayResult(data.meals))
        .catch(error => foundNoItem())
}
const foundNoItem = () => {

}
const displayResult = (mealData) => {
    console.log(mealData);
    const searchedMeals = document.getElementById('searched-meals');
    mealData.forEach(mealItem => {
        const meal = document.createElement('div')
        meal.className = 'meal';
        meal.id = `${mealItem.strMeal}`;
        const mealName = `
        <img class="meal-image" src="${mealItem.strMealThumb}">
        <h1>${mealItem.strMeal}</h1>
        `;
        meal.innerHTML = mealName;
        searchedMeals.appendChild(meal);
        console.log(mealItem.strMeal);

        document.getElementById(`${mealItem.strMeal}`).addEventListener('click', function () {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealItem.strMeal}`)
                .then(response => response.json())
                .then(data => showDetails(data.meals))
        });
    });
};

const showDetails = (clickedMeal) => {
    const item = clickedMeal[0];
    const mealBasicInfo = `
        <img style="width:200px" src="${item.strMealThumb}">
        <h3>Ingredients:</h3>
        `;
    const detailInfo = document.getElementById('detail-info');
    detailInfo.innerHTML = mealBasicInfo;
    const ingredients = document.createElement('ul');
    const li1 = document.createElement('li');
    const listInfo = `
    <li>${item.strIngredient1}</li>
    <li>${item.strIngredient2}</li>
    <li>${item.strIngredient3}</li>
    <li>${item.strIngredient4}</li>
    <li>${item.strIngredient5}</li>
    <li>${item.strIngredient6}</li>
    <li>${item.strIngredient7}</li>
    <li>${item.strIngredient8}</li>
    <li>${item.strIngredient9}</li>
    <li>${item.strIngredient10}</li>
    <li>${item.strIngredient10}</li>
    <li>${item.strIngredient11}</li>
    <li>${item.strIngredient12}</li>
    <li>${item.strIngredient17}</li>
    
    `
    ingredients.innerHTML = listInfo;
    detailInfo.appendChild(ingredients);
};

