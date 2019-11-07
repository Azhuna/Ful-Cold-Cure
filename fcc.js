//FluColdCure

// www.flipclockjs.com


// https://owlcarousel2.github.io

// www.wowjs.uk

// For fruit: 
// fe5d8642240d507552f5552a84949dd5 6ce3d563f5ca6d40ab652519d95d032d&q
$(".fruitCards").on("click", function (event) {
    $("#recipesContainer").empty()
    console.log(event.currentTarget)
    let fruit = $(event.currentTarget)
    console.log(fruit.attr("selectedFruit"))

    let fruitRoot = 'https://www.food2fork.com/api/search?key=fe5d8642240d507552f5552a84949dd5&q='
    let userFruit = fruit.attr("selectedFruit")
    let url = fruitRoot + userFruit
    $.get(url, function (response) {
        let fruitRecipes = JSON.parse(response).recipes
        for (let index = 0; index < fruitRecipes.length; index++) {
            let fruitCardDiv = $("<div>").addClass("fruitCardDiv")
            let myFruitRecipe = $("<img>").attr({
                src: fruitRecipes[index].image_url,
                class: "fruitRecipeImg",
            })
            let myFruitRecipeTitle = $("<h5>").html(fruitRecipes[index].title)
            fruitCardDiv.append(myFruitRecipe).append(myFruitRecipeTitle)
            $("#recipesContainer").prepend(fruitCardDiv)
        }
    })
})