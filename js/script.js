// Declaring some global variables to avoid multiple scripting
const foundedMeals = document.getElementById('founded-meals');
const detailInfo = document.getElementById('detail-info');
const notFound = document.getElementById("not-found");

// Searching matched meal using input data
const SearchResult = () => {
    const searchItem = document.getElementById('search-meal').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`)
        .then(response => response.json())
        .then(data => displayResult(data.meals))
        .catch(error => foundNoItem())
}

// UI on no matched meal found
const foundNoItem = () => {
    notFound.style.display = "block";   // Displaying message on UI about no matched item found
    removeAllMealContent();
}

// Displaying matched meal on UI
const displayResult = (mealData) => {
    notFound.style.display = "none";    // Removing 'no matched item found' message from UI
    removeAllMealContent();
    mealData.forEach(mealItem => {
        const meal = document.createElement('div')
        meal.className = 'meal';
        meal.id = `${mealItem.strMeal}`;
        const mealName = `
        <img class="meal-image" src="${mealItem.strMealThumb}">
        <h2>${mealItem.strMeal}</h2>
        `;
        meal.innerHTML = mealName;
        foundedMeals.appendChild(meal);
        document.getElementById(`${mealItem.strMeal}`).addEventListener('click', function () {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealItem.strMeal}`)
                .then(response => response.json())
                .then(data => showDetails(data.meals))
        });
    });
};

// Displaying detail about clicked meal
const showDetails = (clickedMeal) => {
    const item = clickedMeal[0];
    detailInfo.innerHTML = `
        <h2 style="font-size:2em;">${item.strMeal} Details:</h2>
        <div style="width:50%;float: left;">
        <img style="width:100%;" src="${item.strMealThumb}">
        </div>`;
    const detailContent = document.createElement('div');
    detailContent.style.float = "left";
    detailContent.style.paddingLeft = "10px";
    detailContent.innerHTML = `
        <h3>Ingredients:</h3>`;
    const ingredientList = document.createElement('ul');
    for (let i = 1; i <= 20; i++) {
        if (item[`strIngredient${i}`]) {
            const ingredient = document.createElement('li');
            ingredient.innerText = item[`strIngredient${i}`];
            ingredientList.appendChild(ingredient);
        }
    }
    detailContent.appendChild(ingredientList);
    detailInfo.appendChild(detailContent);
};

// Removing all kind of meal content founded on previous search
const removeAllMealContent = () => {
    // Removing all items if founded on previous search 
    while (foundedMeals.firstChild) {
        foundedMeals.removeChild(foundedMeals.lastChild);
    }
    // Removing detailed meal info if anything exists on UI 
    while (detailInfo.firstChild) {
        detailInfo.removeChild(detailInfo.lastChild);
    }
};