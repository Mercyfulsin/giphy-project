let apiKey = "ve5yV3sYTUluXc9jg6y1dm6N499lIvxC";
let limit = "10";
let query = "";
let baseUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}`;
let queryArray = ["dogs","javascript","coffee","monday","Hunter X Hunter","white chicks","rush hour","James Carter"];

$(document).ready(function(){
    $("#inputGroup-sizing-default").click(function(e){
        e.preventDefault();
        query = $("#user-search").val();
        query = query.replace(" ", "+");
        baseUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=` + query + `&limit=${limit}`;
        console.log(baseUrl);
    });
    initUI();
});

function initUI(){
    queryArray.forEach(function(content){
        generateButton(content);
    });
}

function generateButton(query){
    let btn = $("<button>");
    btn.text(query);
    btn.attr("query",query);
    btn.addClass("gif-button");
    btn.click(function(){
        var query = $(this).attr("query");
        query = query.replace(" ", "+");
        $("#giphy-display").empty();
        grabGiphy(query);
    });
    $("#button-display").append(btn);
}

function grabGiphy(query){
    baseUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=` + query + `&limit=${limit}`;
    console.log(baseUrl);
    $.ajax({
        url: baseUrl
    }).done(function(response){
        response.data.forEach(function(content){
            generateGiphy(content);
        });
    });
    console.log(query);
}

function generateGiphy(obj){
    let card = $("<div class='card' style='width: 18rem;'>");
    let cardBody = $("<div class='card-body'>");
    let cardImage = $("<img class='card-img-top'>");
    let cardText = $("<p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>");
    cardImage.attr("src", obj.images.fixed_height_still.url);
    cardImage.attr("still-url", obj.images.fixed_height_still.url);
    cardImage.attr("gif-url", obj.images.fixed_height.url);
    cardImage.attr("state","still");
    cardImage.click(function(){
        if($(this).attr("state") === "still"){
            $(this).attr("src", $(this).attr("gif-url"));
            $(this).attr("state", "gify");
        }else{
            $(this).attr("src", $(this).attr("still-url"));
            $(this).attr("state","still");
        }
    });
    card.append(cardImage);
    cardBody.append(cardText);
    card.append(cardBody);
    $("#giphy-display").append(card);
}