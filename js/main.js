//var allDivs = $( "div" );
var cocktailList = $(".cocktail-indices").find("div"), current = 0, newCocktail = 0, newClass = "";


$(document).ready(function () {

    $(".prev a").on("click", function () {
        var currentClass = $("#main-wrapper").attr("class");
        current = cocktailList.indexOf(currentClass);
        if(current <= 0){
            newCocktail = 1;
        } else {
            newCocktail = current - 1;
        }
        alert(newCocktail);
        newClass = cocktailList[newCocktail].attr("class");
        $("#main-wrapper").attr("class", newClass);

        //$("#main-wrapper").removeClass("mojito").addClass("bloodymary");
        //$(".main-heading h1").text("Bloody Mary");
    });

    $(".next a").on("click", function () {
        current = cocktailList.indexOf($("#main-wrapper").attr("class"));
        if(current >= 1){
            newCocktail = 0;
        } else {
            newCocktail = current + 1;
        }
        alert(newCocktail);
        $("#main-wrapper").attr("class", cocktailList[newCocktail].attr("class"));

        //$("#main-wrapper").removeClass("bloodymary").addClass("mojito");
        //$(".main-heading h1").text("Mojito");
    });

});