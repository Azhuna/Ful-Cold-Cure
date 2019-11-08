//FluColdCure

// www.flipclockjs.com


// https://owlcarousel2.github.io

// www.wowjs.uk

//make an onclick event on the #vegcardsContainer and create an alert to see if it works
//searchRootId returnd back : strMeal, strMealThumb(photo i think), and idMeal
//get the "idMeal" and store it in a variable to plug into the searchRootrec to get the recipe instructions
// app key: 87a928925605deae71bd457e43c90d4f
//app ID: 281b5eb1

//

var clock = $('.your-clock').FlipClock({
    // ... your options here
    clockFace: 'DailyCounter',
    countdown: true
});


$(".vegCards").on("click", function (event) {
    console.log(event)
    $("#recipesContainer").empty()
    let searchRoot = 'https://api.edamam.com/search?app_id=281b5eb1&app_key=87a928925605deae71bd457e43c90d4f&q='
    let vegEvent = $(event.currentTarget)
    let vegSearch = vegEvent.attr("id")
    let vegUrl = searchRoot + vegSearch
    $.get(vegUrl, function (vegSearchId) {
        console.log(vegSearchId)
        let vegArray = vegSearchId.hits
        console.log(vegArray)
        for (let index = 0; index < vegArray.length; index++) {
            let vegImg = $("<img>").attr({
                src: vegArray[index].recipe.image,
                id: "vImg",
                vegName: vegArray[index].recipe.url
            });
            let vegText = $("<h5>").attr("id", "vText").html(vegArray[index].recipe.label).attr("vegName", vegArray[index].recipe.url)
            let vegDiv = $("<div>").attr({
                id: "vegDivContainer",
                vegName: vegArray[index].recipe.url

            });
            vegDiv.append(vegImg)
            vegDiv.append(vegText)


            // vegImg.append($("<h4>").attr("id", vegText).html (vegArray[index].recipe.label)
            $("#recipesContainer").append(vegDiv)

        }
    })
})
//search for id


//using id to search recipe
// let searchRootRec = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='

// let mealId = $(idMeal)
// console.log(mealId)
// let vegInput = $("h4").html
// let vegUrl = searchRoot `${vegInput}`
// //get recipe id and add it to the searchRootRec
// //form card with the recipe and photo
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
//make an onclick event
//find info in thats spacific to what was clicked on 
//to use the info in a new get request that will give us a recipe that we can show on a modal 

$("#recipesContainer").on("click", function (event) {
    let vegRecipe = $(event.target)
    let vegWebsite = vegRecipe.attr("vegName")

    $.get(vegWebsite, function (response) {
        let modal = $("#myModal");
        $("#recipeSite").html(response)
        modal.css("display", "block");
    })



})

$(".close").on("click", function () {
    let modal = $("#myModal");
    modal.css("display", "none");
})