//FluColdCure

// www.flipclockjs.com


// https://owlcarousel2.github.io

// www.wowjs.uk

//make an onclick event on the #vegcardsContainer and create an alert to see if it works
//searchRootId returnd back : strMeal, strMealThumb(photo i think), and idMeal
//get the "idMeal" and store it in a variable to plug into the searchRootrec to get the recipe instructions
// app key: 87a928925605deae71bd457e43c90d4f
//app ID: 281b5eb1

$("#local-time-container").html("Current time: " + moment().format("hh:mm:ss a"))

// A current moment (curr)
let current = moment()
// A moment for March 31, 2020 (last)
let fluSeason = moment([2020, 2, 31])

// Calculate the difference between last and curr in Days

let deltaDays = fluSeason.diff(current, 'days')

if (deltaDays <= 0) {
    deltaDays = 0;
}


var clock = $('.your-clock').FlipClock(3600 * 24 * deltaDays, {
    clockFace: 'DailyCounter',
    countdown: true,
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

            let ratings = $("<div>").attr({
                class: "stars",
                "data-rating": ""
            })
            let star1 = $("<span>").attr({
                class: "star",
                value: "0"
            }).html("&nbsp;")

            let star2 = $("<span>").attr({
                class: "star",
                value: "1"
            }).html("&nbsp;")

            let star3 = $("<span>").attr({
                class: "star",
                value: "2"
            }).html("&nbsp;")

            let star4 = $("<span>").attr({
                class: "star",
                value: "3"
            }).html("&nbsp;")

            let star5 = $("<span>").attr({
                class: "star",
                value: "4"
            }).html("&nbsp;")

            star1.append(star2).append(star3).append(star4).append(star5)

            ratings.append(star1)

            $(".star").on("click", function (event) {
                //    saving the star class array in a variable 
                let stars = $(".star")
                // turning the value of the data-rating attribute into a number and saving it in a variable
                let rating = parseInt($(".stars").attr("data-rating"));
                // going in the stars array at index that is the same value as the variable rating minus 1 and saving that index place in a variable
                let target = stars[rating - 1]
                // dispatching event so that the function setRating is called
                let vote = setRating(event)

                console.log(vote)
            })

            function setRating(event) {
                let clickedStar = parseInt($(event.target).attr("value"));
                let stars = $(".star")
                let num = 0;
                console.log(stars)

                for (let index = 0; index < stars.length; index++) {
                    let star = $(stars[index]);
                    if (index <= clickedStar) {
                        star.addClass("rated")

                    } else {
                        star.removeClass("rated");
                    }
                    //is this the index of the star that was clicked?
                    if (index === clickedStar) {
                        num = index + 1;
                    }
                }

                $(".stars").attr("data-rating", num);

                return num;
            };
            let url = vegArray[index].recipe.url
            let vegText = $("<h5>").attr("id", "vText").html(vegArray[index].recipe.label).attr("vegName", url)
            let vegDiv = $("<div>").attr({
                id: "vegDivContainer",
                vegName: url

            });
            vegDiv.append(vegImg)
            vegDiv.append(vegText).append(ratings)


            // vegImg.append($("<h4>").attr("id", vegText).html (vegArray[index].recipe.label)
            $("#recipesContainer").append(vegDiv)

        }

        let db = firebase.database()

        // user rates recipe by clicking which adds the recipe url and the rating (num) to the database
        db.ref(url).once("value", function (snap) {
            let dbVal = snap.val()
            if (dbVal === null) {
                db.ref(url).set({
                    rating: num,
                    votes: 1
                })
            } else {
                let currentRating = dbVal.rating
                let currentVote = dbVal.votes
                let newRating = (currentRating + num) / (currentVote++)
                db.ref(url).update({
                    rating: newRating,
                    votes: currentVote++
                })
            }
        })
        $(".stars").attr("data-rating", newRating);
    })



})

// Api keys For fruit: 
// fe5d8642240d507552f5552a84949dd5  or 6ce3d563f5ca6d40ab652519d95d032d&q
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
            let fruitCardDiv = $("<div>").addClass("fruitCardDiv div").attr("recipe", fruitRecipes[index].source_url)
            let myFruitRecipe = $("<img>").attr({
                src: fruitRecipes[index].image_url,
                class: "fruitRecipeImg",
                recipe: fruitRecipes[index].source_url
            })
            let ratings = $("<div>").attr({
                class: "stars",
                "data-rating": ""
            })
            let star1 = $("<span>").attr({
                class: "star",
                value: "0"
            }).html("&nbsp;")

            let star2 = $("<span>").attr({
                class: "star",
                value: "1"
            }).html("&nbsp;")

            let star3 = $("<span>").attr({
                class: "star",
                value: "2"
            }).html("&nbsp;")

            let star4 = $("<span>").attr({
                class: "star",
                value: "3"
            }).html("&nbsp;")

            let star5 = $("<span>").attr({
                class: "star",
                value: "4"
            }).html("&nbsp;")

            star1.append(star2).append(star3).append(star4).append(star5)

            ratings.append(star1)

            $(".star").on("click", function (event) {
                //    saving the star class array in a variable 
                let stars = $(".star")
                // turning the value of the data-rating attribute into a number and saving it in a variable
                let rating = parseInt($(".stars").attr("data-rating"));
                // going in the stars array at index that is the same value as the variable rating minus 1 and saving that index place in a variable
                let target = stars[rating - 1]
                // dispatching event so that the function setRating is called
                let vote = setRating(event)

                console.log(vote)
            })

            function setRating(event) {
                let clickedStar = parseInt($(event.target).attr("value"));
                let stars = $(".star")
                let num = 0;
                console.log(stars)

                for (let index = 0; index < stars.length; index++) {
                    let star = $(stars[index]);
                    if (index <= clickedStar) {
                        star.addClass("rated")

                    } else {
                        star.removeClass("rated");
                    }
                    //is this the index of the star that was clicked?
                    if (index === clickedStar) {
                        num = index + 1;
                    }
                }

                $(".stars").attr("data-rating", num);

                return num;
            };

            let myFruitRecipeTitle = $("<h5>").html(fruitRecipes[index].title).attr("recipe", fruitRecipes[index].source_url)
            fruitCardDiv.append(myFruitRecipe).append(myFruitRecipeTitle).append(ratings)
            $("#recipesContainer").prepend(fruitCardDiv)

            function setRating(event) {
                let clickedStar = parseInt($(event.target).attr("value"));
                let stars = $(".star")
                let num = 0;
                console.log(stars)

                for (let index = 0; index < stars.length; index++) {
                    let star = $(stars[index]);
                    if (index <= clickedStar) {
                        star.addClass("rated")

                    } else {
                        star.removeClass("rated");
                    }
                    //is this the index of the star that was clicked?
                    if (index === clickedStar) {
                        num = index + 1;
                    }
                }

                $(".stars").attr("data-rating", num);

                return num;
            };
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



$("#recipesContainer").on("click", function (event) {
    let fruitRecipe = $(event.target)
    let fruitWebsite = fruitRecipe.attr("recipe")

    $.get(fruitWebsite, function (response) {
        let modal = $("#myModal");
        $("#recipeSite").html(response)
        modal.css("display", "block")
    })
})
$(".close").on("click", function () {
    let modal = $("#myModal");
    modal.css("display", "none");
})