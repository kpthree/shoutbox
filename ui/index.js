$(document).ready(function() {

    //loadTweets();
    loadFromLocalStorage();
    $("#shout-button").click(shoutToServer);
    $("#clear").click(clearShouts);
    var socket = io.connect('http://hackathon.sokrati.com:9999');
    socket.on('update', appendShout);

    function shoutToServer() {
        $("#error").text("");
        var text = $("#shout-text").attr('value');
        var name = $("#name").attr('value');
        if (!text || !name) {
            $("#error").text('Kuch to likho yaar...');
        }
        else {
            var data = {name: name, text: text};
            socket.emit('shout', data);
            appendShout(data);
            $("#shout-text").attr('value', "");
        }
    }

    function loadTweets() {
        $.getJSON("http://search.twitter.com/search.json?rpp=100&callback=?&q=%23"
                  + "SokratiHackathon", function(data) {
            for(var i = data.results.length-1; i >= 0; i--) {
                $(".one-shout").first().before(
                    "<div class='one-shout'>" +
                    data.results[i].from_user_name + ": " + 
                    data.results[i].text +
                    "</div>"
                );
            }
        });
    }

    function loadFromLocalStorage() {
        var text;
        for (i = 0; i <= localStorage["count"]; i++) {
            text = localStorage["shouts" + i];
            $(".one-shout").first().before(
                "<div class='one-shout'>" + text + "</div>"
            );
        }
    }

    function clearShouts() {
        $("#shouts").text("");
        $("#shouts").append("<div class='one-shout'></div>");
    }

    function appendShout(data) {
        $(".one-shout").first().before(
            "<div class='one-shout'>" +
            data.name + ": " + data.text +
            "</div>"
        );
        var counter = localStorage["count"];
        if (counter) {
            counter++;
        }
        else {
            counter = 0;
        }
        localStorage["shouts" + counter] = data.name + ": " + data.text;
        localStorage["count"] = counter;
    }
});