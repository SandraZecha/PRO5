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

$(document).ready(function () {
    let newCocktail, newClass;

    //Change to prev Cocktail on click
    $(".prev a").on("click", function () {
        getCurrentIndex();

        if(current <= 0){
            newCocktail = 1;
        } else {
            newCocktail = current - 1;
        }
        newClass = cocktailList.eq(newCocktail).attr("class");
        $("#main-wrapper").attr("class", newClass);
        $(".main-heading h1").text(newClass);

    });

    //Change to next Cocktail on click
    $(".next a").on("click", function () {
        getCurrentIndex();

        if(current >= 1){
            newCocktail = 0;
        } else {
            newCocktail = current + 1;
        }
        newClass = cocktailList.eq(newCocktail).attr("class");
        $("#main-wrapper").attr("class", newClass);
        $(".main-heading h1").text(newClass);

    });

});