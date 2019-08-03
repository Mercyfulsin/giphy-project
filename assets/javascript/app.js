let apiKey = "ve5yV3sYTUluXc9jg6y1dm6N499lIvxC";
let limit = "10";
let query = "";
let baseUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}`;
let queryArray = ["dogs", "javascript", "coffee", "monday", "Hunter X Hunter", "white chicks", "rush hour", "James Carter"];

$(document).ready(function () {
    if (localStorage.getItem("queryArray") == null || localStorage.getItem("queryArray") == "") {
        localStorage.setItem("queryArray", queryArray);
    } else {
        queryArray = localStorage.getItem("queryArray").split(',');
    }
    var select = $("<select>");
    for (var i = 1; i < 6; i++) {
        var option = $("<option>");
        option.attr("value", i + "0");
        option.text(i + "0");
        select.append(option);
    }
    $("#header").append("<H1>Grab some Giphy's!</H1>");
    $("#dropdown").append("<span>Amount of Gifs to pull: </span>", select);
    $("#inputGroup-sizing-default").click(function (e) {
        e.preventDefault();
        var searchQuery = $("#user-search").val();
        if (searchQuery != "" && queryArray.indexOf(searchQuery) == -1) {
            queryArray.push(searchQuery);
            localStorage.setItem("queryArray", queryArray);
            paintButtons();
        }
    });
    paintButtons();
});

function paintButtons() {
    $("#button-display").empty();
    queryArray.forEach(function (content) {
        generateButton(content);
    });
}

function generateButton(query) {
    let contain = $("<div>");
    contain.attr("style", "display: inline-block; margin: 5px;")
    let exit = $("<button>");
    exit.text("X");
    exit.addClass("btn btn-secondary btn-outline-primary");
    exit.attr("style", "font-weight: bold;");
    exit.click(function () {
        var obj = $(this).parent().children()[1];
        queryArray.splice(queryArray.indexOf($(obj).attr("query")), 1);
        localStorage.setItem("queryArray", queryArray);
        $(this).parent().remove();
    });
    let btn = $("<button>");
    btn.text(query);
    btn.attr("query", query);
    btn.addClass("gif-button btn btn-secondary btn-outline-primary");
    btn.click(function () {
        var query = $(this).attr("query");
        query = query.replace(" ", "+");
        $("#giphy-display").empty();
        grabGiphy(query);
    });
    contain.append(exit);
    contain.append(btn);
    $("#button-display").append(contain);
}

function grabGiphy(query) {
    limit = $("select option:selected").attr("value");
    baseUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=` + query + `&limit=${limit}`;
    console.log(baseUrl);
    $.ajax({
        url: baseUrl
    }).done(function (response) {
        response.data.forEach(function (content) {
            generateGiphy(content);
        });
    });
    console.log(query);
}

function generateGiphy(obj) {
    let card = $("<div class='card' style='width: 18rem;'>");
    let cardBody = $("<div class='card-body row'>");
    let cardImage = $("<img class='card-img-top'>");
    let cardText = $(`<p class='card-text col-sm-12'>Rating: ${obj.rating}<br>Title: ${obj.title}</p>`);
    cardImage.attr("src", obj.images.fixed_height_still.url);
    cardImage.attr("still-url", obj.images.fixed_height_still.url);
    cardImage.attr("gif-url", obj.images.fixed_height.url);
    cardImage.attr("state", "still");
    cardImage.click(function () {
        if ($(this).attr("state") === "still") {
            $(this).attr("src", $(this).attr("gif-url"));
            $(this).attr("state", "gify");
        } else {
            $(this).attr("src", $(this).attr("still-url"));
            $(this).attr("state", "still");
        }
    });
    card.append(cardImage);
    cardBody.append(cardText);
    card.append(cardBody);
    $("#giphy-display").append(card);
}