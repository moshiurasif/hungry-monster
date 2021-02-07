// hungry monster script added here

document.getElementById("search-button").addEventListener("click", function () {
    // show warning function
    getWarning("");
    document.getElementById("meal-summery").style.display = 'none';

    const inputMealName = document.getElementById("input-meal").value;
    // empty spaces trim
    const mealName = inputMealName.trim();

    if (mealName === "") {
        getWarning("Please Enter a meal name.")
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
            .then(response => response.json())
            .then(data => {
                if (data.meals === null) {
                    getWarning(`No meal found with name \"${mealName}\". Please try again.`)
                } else {
                    displayFoundMeals(data.meals);
                }
            })
    }
    // input meal clear
    document.getElementById("input-meal").value = "";
})

// Search: Enter key trigger.
document.getElementById("input-meal").addEventListener("keyup", event => {
    if (event.key === "Enter") document.getElementById("search-button").click();
});

// warning function create
function getWarning(warningText) {
    document.getElementById("warning-text").innerText = warningText;
}


function displayFoundMeals(meals) {
    // previous search result clear
    document.getElementById("meal-list").innerHTML = "";

    meals.forEach(meal => {
        const mealDiv = document.createElement("div");
        mealDiv.innerHTML = `
        <div onclick='mealSummery("${meal.idMeal}")' class="meal-card">
            <img src="${meal.strMealThumb}" class="meal-image">
            <h5 class="meal-title">${meal.strMeal}</h5>
        </div>
        `;
        document.getElementById("meal-list").appendChild(mealDiv);
    });
}

// fetch single meal Summery
function mealSummery(mealId) { 
    console.log(mealId);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            displayMealSummery(data.meals[0]);
        })
}

// single meal Summery show
function displayMealSummery(meal) {
    document.getElementById("meal-summery-display").innerHTML = `
    <div class="text-center">
        <img src="${meal.strMealThumb}" class="meal-summery-image">
        <h3 class="meal-summery-title">${meal.strMeal}</h3>
    </div>
    <div>
        <h4>  Ingredients</h4>
         <ul id="ingredient-list">

        </ul>
    </div>
    `;

    // Displaying meal details.
    document.getElementById("meal-details-display").innerHTML = `${meal.strInstructions}`;

    // Displaying Ingredients.
    for (let i = 1; i <= 20; i++) {
        let ingredient = 'strIngredient' + i;
        let quantity = 'strMeasure' + i;

        if (meal[ingredient] === "" || meal[ingredient] == null) {
            break;
        }

        const li = document.createElement("li");
        li.innerHTML = `
        <li>${meal[quantity]} ${meal[ingredient]}</li>
        `;
        document.getElementById("ingredient-list").appendChild(li)
    }

    document.getElementById("meal-summery").style.display = "block";
}
    
