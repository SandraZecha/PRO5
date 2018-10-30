$(document).ready(function () {

    $(".prev a").on("click", function () {
        $("#main-wrapper").removeClass("mojito").addClass("bloodymary");
        $(".main-heading h1").text("Bloody Mary");
    });

    $(".next a").on("click", function () {
        $("#main-wrapper").removeClass("bloodymary").addClass("mojito");
        $(".main-heading h1").text("Mojito");
    });

});