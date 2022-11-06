const ingredientJson = [];
const dishsJson = [];

class Ingredient {
  static numOfIngreditents = 0;

  constructor(name, img, calories) {
    this.id = ++Ingredient.numOfIngreditents;
    this.name = name;
    this.img = img;
    this.calories = calories;
  }

  get Calories() {
    return this.calories;
  }

  Render() {
    return `
        <p>ingredient details:</p>
        <img src="${this.img}" alt="${this.name} picture" class="card-img-top"/>
        <p>${this.name}</p>
        <p>Calories: ${this.calories}</p>
      `;
  }
}

class DishRecipe {
  static numOfRecipes = 0;

  constructor(name, ingredients, time, cookingMethod, img) {
    this.id = ++DishRecipe.numOfRecipes;
    this.name = name;
    this.ingredients = ingredients;
    this.time = time;
    this.cookingMethod = cookingMethod;
    this.img = img;
  }

  Render() {
    return `
        <h6>Dish Recipe details:</h6>
        <img src="${this.img}" alt="${this.name} picture" class="card-img-top"/>
        <p>dish name: ${this.name}</p>
        <p>Cooking time: ${this.time} min</p>
        <p>Cooking method: ${this.cookingMethod}</p>
        <p>Total calories: ${this.getTotalCalories()}</p>
        <button type="button" class="btn btn-secondary" onclick="renderRecipeIngredients(${
          this.id
        })">Show ingredients</button>
      `;
  }

  getTotalCalories() {
    return this.ingredients.reduce((partSum, ing) => partSum + ing.Calories, 0);
  }

  getIngredients() {
    return this.ingredients;
  }
}

$(document).ready(function () {
  $("#addIngredientBTN").click(addIngredient);
  $("#newIngredientBTN").click(closeRecipeFrom);
  $("#newRecipeBTN").click(() => {
    newRecipe();
    renderAllIngredients();
  });
  renderAllRecipes();
});

//Add new ingredient
const addIngredient = () => {
  const ingredientName = $("#newIngredientName").val();
  const ingredientImg = $("#newIngredientName").val();
  const ingredientCalories = $("#newIngredientCalories").val();

  if (!ingredientName || !ingredientImg || !ingredientCalories) return;

  const ing = new Ingredient(ingredientName, ingredientImg, ingredientCalories);
  ingredientJson.push(ing);

  $("#newIngredientName").val("");
  $("#newIngredientName").val("");
  $("#newIngredientName").val("");
  $("#newIngredientModal").modal("toggle");
};

//render new recipe form and show all ingredients
const newRecipe = () => {
  $("#newRecipe").html(
    `
      <div class='row'>
        ${createNewRecipeForm()}
      </div>
      <div class='row'>
        <div class='col-10 col-md-6 m-auto'>
          <div id='newRecIngredeint' class='row row-cols-1 row-cols-md-4'></div>
        </div>
      </div>
      <div class="row d-flex justify-content-center mt-5 border-bottom">
        <div class="col text-center mb-5">
            <button id="createRecipe" type="button" class="btn btn-success" onclick='addReceipe()'>Create Recipe</button>
            <button id="closeRecipe" type="button" class="btn btn-danger" onclick='closeRecipeFrom()'>Close</button>
        </div>
      </div>
    `
  );
};

//new recipe form
const createNewRecipeForm = () => {
  return `
      <div class='col-10 col-md-6 m-auto'>
        <div class="mb-3">
          <input id="newReceipeName" type="text" class="form-control" placeholder="Recipe Name">
        </div>
        <div class="mb-3">
          <input id="newReceipeMethod" type="text" class="form-control" placeholder="Recipe cooking method">
        </div>
        <div class="mb-3">
          <input id="newReceipeTime" type="text" class="form-control" placeholder="Recipe cooking time">
        </div>
        <div class="mb-3">
          <input id="newReceipeImg" type="text" class="form-control" placeholder="Recipe Img (URL)">
        </div>
      </div>
    `;
};

//close recepie from
const closeRecipeFrom = () => {
  $("#newRecipe").html("");
};

//Render all ingredients when create new recipe
const renderAllIngredients = () => {
  ingredientJson.map((item) =>
    $("#newRecIngredeint").append(
      `
      <div class='col mb-2'>
        <div class="card h-100 m-auto text-center">
          <div class="form-check m-auto mt-2">
            <input class="form-check-input" type="checkbox" value="" id="ingredeint${
              item.id
            }">
            <label class="form-check-label" for="ingredeint${
              item.id
            }">Add</label>
          </div>
          <div class="card-body">
            ${item.Render()}
          </div>
        </div>
      <div>
    `
    )
  );
};

//add new recipe
const addReceipe = () => {
  const receipeName = $("#newReceipeName").val();
  const recipeTime = $("#newReceipeTime").val();
  const receipeMethod = $("#newReceipeMethod").val();
  const recipeImg = $("#newReceipeImg").val();

  const recepieIngredients = ingredientJson.map((ing) => {
    if ($(`#ingredeint${ing.id}`).is(":checked")) return ing;
  });

  if (
    !receipeName ||
    !receipeMethod ||
    !recipeTime ||
    !recipeImg ||
    !recepieIngredients
  )
    return;

  const rec = new DishRecipe(
    receipeName,
    recepieIngredients,
    recipeTime,
    receipeMethod,
    recipeImg
  );
  dishsJson.push(rec);

  $("#newReceipeName").val("");
  $("#newReceipeTime").val("");
  $("#newReceipeMethod").val("");
  $("#newReceipeImg").val("");
  closeRecipeFrom();
  renderAllRecipes();
};

//Render all recipes
const renderAllRecipes = () => {
  $("#allRecipes").html("");
  dishsJson.map((item) =>
    $("#allRecipes").append(
      `
      <div class='col mb-2'>
        <div class="card m-auto text-center">
          <div class="card-body">
            ${item.Render()}
          </div>
        </div>
      <div>
    `
    )
  );
};

//render all ingredients of specific recipe
const renderRecipeIngredients = (recipeId) => {
  $("#recipeIngredientContainer").html("");
  dishsJson[recipeId - 1].getIngredients().map((item) =>
    $("#recipeIngredientContainer").append(
      `
        <div class='col mb-2'>
          <div class="card m-auto text-center">
            <div class="card-body">
              ${item.Render()}
            </div>
          </div>
        <div>
      `
    )
  );
  $("#recipeIngredientModal").modal("toggle");
};

/**
 * This area keep ingredients static data
 */
const soy = new Ingredient(
  "soy",
  "https://images.heb.com/is/image/HEBGrocery/000129449?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0",
  30
);
const chickenBreast = new Ingredient(
  "Chicken Breast",
  "https://cdn.shopify.com/s/files/1/0274/0217/4498/products/bonelessbreast_300x.jpg?v=1588263198",
  300
);

ingredientJson.push(soy, chickenBreast);

/**
 * This area keep dishs static data
 */
const chickenSoy = new DishRecipe(
  "Chicken w Soy",
  [chickenBreast, soy],
  30,
  "oven",
  "https://upload.wikimedia.org/wikipedia/commons/0/07/Soy_Sauce_Chicken.jpg"
);

dishsJson.push(chickenSoy);
