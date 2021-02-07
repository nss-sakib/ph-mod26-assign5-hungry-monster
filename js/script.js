// Search matched meal using input data
const SearchResult = () => {
    const searchItem = document.getElementById('search-meal').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`)
        .then(response => response.json())
        .then(data => displayResult(data.meals))
        .catch(error => foundNoItem())
}

// Notify if no matched meal found
const foundNoItem = () => {
    const searchedMeals = document.getElementById('detail-info');
    const alert = `
    <h1 style="text-align:center">No item Found!</h1>
    <ol>
    <li>Check your internet is connected</li>
    <li>Or try with another keyword</li>
    </ol>
    `
    searchedMeals.innerHTML = alert;
}

// Display matched meal on UI
const displayResult = (mealData) => {
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
        document.getElementById(`${mealItem.strMeal}`).addEventListener('click', function () {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealItem.strMeal}`)
                .then(response => response.json())
                .then(data => showDetails(data.meals))
        });
    });
};

// Display detail about clicked meal
const showDetails = (clickedMeal) => {
    const item = clickedMeal[0];
    const detailInfo = document.getElementById('detail-info');
    const mealBasicInfo = `
        <img style="width:200px" src="${item.strMealThumb}">
        <h3>Ingredients:</h3>
        `;
    detailInfo.innerHTML = mealBasicInfo;
    const ingredientList = document.createElement('ul');
    for (let i = 1; i <= 20; i++) {
        if (item[`strIngredient${i}`]) {
            const ingredient = document.createElement('li');
            ingredient.innerText = item[`strIngredient${i}`];
            ingredientList.appendChild(ingredient);
        }
    }
    detailInfo.appendChild(ingredientList);
};