var cocktailList = $('.cocktail-indices').children(), current;

//updates the "current" variable to get the index of the current Cocktail
function getCurrentIndex () {
    let currentClass = $("#main-wrapper").attr("class");

    cocktailList.each(function( ) {
        if( $(this).attr("class") === currentClass ) {
            current = $(this).index();
        }
    });
}

//update the ingredients based on current Cocktail
function getCurrentIngredients () {
    getCurrentIndex();

    let currentIngredients = cocktailList.eq(current).children().children();
    let ingredientDivs = document.querySelectorAll('.ingredient-text-wrapper');
    //console.log(ingredientDivs);

    //empty all ingredient div's before filling them with right values
    for(let i = 0; i < 8; i++) {
        ingredientDivs[i].childNodes[1].innerHTML = "";
    }

    // for loop through all ingredients
    // fill child nodes of divs with right innerHTML of hidden indices div's
    for(let i = 0; i < currentIngredients.length; i++){
        ingredientDivs[i].childNodes[1].innerHTML = currentIngredients.eq(i)[0].innerHTML;
        //console.log(ingredientDivs[i].childNodes[1].text);
    }
}

//to hide ingredients before cocktail switch, check for active class and remove if necessary
function toggleIngredients() {
    if($(".cocktail-ingredients").hasClass("active")) {
        $('.cocktail-ingredients').removeClass("active").addClass("inactive");
    }
}

$(document).ready(function () {
    let newCocktail, newClass;

    //Change to prev Cocktail on click
    $(".prev a").on("click", function () {
        getCurrentIndex();

        if(current <= 0){
            newCocktail = 9;
        } else {
            newCocktail = current - 1;
        }
        newClass = cocktailList.eq(newCocktail).attr("class");

        toggleIngredients();

        $("#main-wrapper").attr("class", newClass);

        //smooth heading change
        let heading = $(".main-heading h1");
        heading.fadeOut(function(){
            heading.text(cocktailList.eq(newCocktail).find("p:first").text());
            heading.fadeIn();
        });

        getCurrentIngredients();

    });

    //Change to next Cocktail on click
    $(".next a").on("click", function () {
        getCurrentIndex();

        if(current >= 9){
            newCocktail = 0;
        } else {
            newCocktail = current + 1;
        }
        newClass = cocktailList.eq(newCocktail).attr("class");

        toggleIngredients();

        $("#main-wrapper").attr("class", newClass);

        //smooth heading change
        let heading = $(".main-heading h1");
        heading.fadeOut(function(){
            heading.text(cocktailList.eq(newCocktail).find("p:first").text());
            heading.fadeIn();
        });

        getCurrentIngredients();

    });

    //Show ingredients of cocktail on click
    $(".mix-it a").on("click", function () {
        $('.cocktail-ingredients').toggleClass("inactive active");
    });

});