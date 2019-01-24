var cocktailList = $('.cocktail-indices').children(), current, randomIndex;
var smallImgs = $('.recipe-small-images').children(), largeImgs = $('.recipe-large-images').children();

//updates the "current" variable to get the index of the current Cocktail
function getCurrentIndex () {
    let currentClass = $("#main-wrapper").attr("class");

    cocktailList.each(function( ) {
        if( $(this).attr("class") === currentClass ) {
            current = $(this).index();
        }
    });
}

//updates the "randomIndex" variable to get the index of the next displayed random Cocktail
function getRandomIndex () {
    let min = 0, max = 9;
    //generate random number as index between min and max
    //floor to get an integer
    randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
}

//update the ingredients based on current Cocktail
function getCurrentIngredients () {
    getCurrentIndex();
    let currentIngredients = cocktailList.eq(current).children().children();
    let ingredientDivs = document.querySelectorAll('.ingredient-text-wrapper');

    //empty all ingredient div's before filling them with right values
    for(let i = 0; i < 8; i++) {
        ingredientDivs[i].childNodes[1].innerHTML = "";
    }

    // for loop through all ingredients
    // fill child nodes of divs with right innerHTML of hidden indices div's
    for(let i = 0; i < currentIngredients.length; i++){
        ingredientDivs[i].childNodes[1].innerHTML = currentIngredients.eq(i)[0].innerHTML;
    }
}

//to hide ingredients before cocktail switch, check for active class and remove if necessary
function toggleIngredients() {
    if($(".cocktail-ingredients").hasClass("active")) {
        $('.cocktail-ingredients').removeClass("active").addClass("inactive");
    }
}

//shining function - add shining overlay to cocktail
function cocktailShine(t) {
    //interval - start func every 7 seconds
    setInterval(function () {
        setTimeout(function () {
            t.addClass("shine")
        }, 4000);
        setTimeout(function () {
            t.removeClass("shine")
        }, 6000);
    }, 7000)
}

//Build the glasses first
function buildGlasses() {
    //timer - quit start sequence after 7 sec
    setTimeout(function () {
        $('#start-wrapper').removeClass("glasses-beginning").addClass("glasses");
        $('.start-names').fadeIn();
    }, 500);
}

//Start Scree - timer if user doesn't click on window
function startTimer() {
    //timer - quit start sequence after 7 sec
    setTimeout(function () {
        $('#start-wrapper').removeClass("glasses").addClass("glasses-shuttered");

        setTimeout(function () {
            $('#start-wrapper').fadeOut(function(){
                $('.interface').fadeIn();
                $('#main-wrapper .cocktail-animations').fadeIn();
            });
        }, 1000);
     }, 7000);
}
//show right recipe in lightbox & prepare correct download img
function getRecipe() {
    //get index
    getCurrentIndex();

    //take prev and download img. from hidden index list
    let prevImg = smallImgs.eq(current).attr("src");
    let downloadImg = largeImgs.eq(current).attr("src");

    //set prev img
    $('#lightbox').children()[1].src = prevImg;
    //set download img
    document.getElementById('download-button').getElementsByClassName('image-link')[0].href = downloadImg;
    $('#lightbox').addClass("spin-button");
}

//On Click on li in overview, switch to right Cocktail
function overviewCocktailSwitch(c) {
    //get right classname from li classlist
    let newCocktail = c.classList[1];

    //change class of main-wrapper to the new one
    $("#main-wrapper").attr("class", newCocktail);

    getCurrentIndex();
    //smooth heading change
    let heading = $(".main-heading h1");
    heading.fadeOut(function(){
        heading.text(cocktailList.eq(current).find("p:first").text());
        heading.fadeIn();
    });

    getCurrentIngredients();
}


$(document).ready(function () {
    //start to build glasses
    buildGlasses();

    //start timer for start screen
    startTimer();

    let newCocktail, newClass;
    let lightbox = document.getElementById('lightbox');

    //Change to prev Cocktail on click
    $(".prev a").on("click", function () {
        //get the index of currently displayed cocktail
        getCurrentIndex();

        //check if it's the first one
        if(current <= 0){
            newCocktail = 9;
        } else {
            newCocktail = current - 1;
        }
        newClass = cocktailList.eq(newCocktail).attr("class");

        //toggleIngredients();

        //change class of main-wrapper to the new one
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
        //get the index of currently displayed cocktail
        getCurrentIndex();

        //check if it's the last one
        if(current >= 9){
            newCocktail = 0;
        } else {
            newCocktail = current + 1;
        }
        newClass = cocktailList.eq(newCocktail).attr("class");

        //toggleIngredients();

        //change class of main-wrapper to the new one
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

    //Change to random Cocktail on click of shaker icon
    $(".random-nav").on("click", function () {
        //get new random index and current one and check if they aren't the same
        getRandomIndex();
        getCurrentIndex();

        while (randomIndex === current) {
            getRandomIndex();
        }
        newClass = cocktailList.eq(randomIndex).attr("class");

        //change class of main-wrapper to the new one
        $("#main-wrapper").attr("class", newClass);

        //smooth heading change
        let heading = $(".main-heading h1");
        heading.fadeOut(function(){
            heading.text(cocktailList.eq(randomIndex).find("p:first").text());
            heading.fadeIn();
        });

        getCurrentIngredients();
    });

    //call cocktail shine func for shimmer effect
    $("body").each(function () {
        cocktailShine($(this))
    });


    //overlay for overview
    $('.overview').on('click', function(){
        $('.overview-animation').hide();
        $('body').toggleClass('open-nav');

        setTimeout(function () {
            $('.overview-animation').fadeIn();
        }, 1000);
    });

    $('.close-overview').on('click', function(){
        $('body').toggleClass('open-nav');
        $('.overview-animation').fadeOut();
    });

    //switch to right cocktail on click in overview
    $('.overview-cocktails-list').on('click', function(c){
        $('body').toggleClass('open-nav');
        //give target to func for access of classlist
        overviewCocktailSwitch(c.target);
    });
    //change bg ingredients on hover
    $(".overview-cocktails-list").hover(function(c) {
        //get right classname from li classlist
        let newIng = c.target.classList[1];
        //change class for ingredient wrapper
        document.getElementsByClassName('ingredient')[0].className = "ingredient " + newIng;
        console.log(document.getElementsByClassName('ingredient')[0].className);
    }, function () {
        //on mouse leave do nothing
    });


    //Start screen - on click on window change sequences
    $("#start-wrapper .cocktail-animations").on("click", function () {
        $('#start-wrapper').removeClass("glasses").addClass("glasses-shuttered");

        setTimeout(function () {
            $('#start-wrapper').fadeOut(function(){
                $('.interface').fadeIn();
                $('#main-wrapper .cocktail-animations').fadeIn();
            });
        }, 1000);
    });

    //recipe lightbox - show image on click, close on click of close button
    $('#recipe-button').on('click', function () {
        lightbox.style.display = "block";
        getRecipe();
    });

    $('.close-button').on('click', function () {
        lightbox.style.display = "none";
        $('#lightbox').removeClass("spin-button");
    });


});