var sindex = 0;
var cycle = false;

function start() {
    var query = getParameterByName('q');
    if (query) search(query.replaceAll("+", "%2B"));

    document.getElementById('keywords').focus();

    window.setInterval(function () {
        updatetime();
    }, 200);
}

function handleKeyPress(e) {
    var key = e.keyCode || e.which;
    var text = document.getElementById("keywords").value.replaceAll("+", "%2B");
    var option = text.substr(1, text.indexOf(' ') - 1) || text.substr(1);
    var subtext = text.substr(2 + option.length);
    if (key == 13) { // Search functions
        search(text);
    }
    if (key == 9) { // Tab Completion Functions
        e.preventDefault();
        e.stopPropagation();
        if (text[0] === ';') {
            switch (option) {
                case 't':
                    var streamers = ['admiralbahroo', 'moonmoon_ow', 'witwix'];
                    if (!subtext || cycle) {
                        cycle = true;
                        if (sindex > streamers.length - 1) sindex = 0;
                        document.getElementById("keywords").value = ';t ' + streamers[sindex++];
                        return;
                    }
                    for (var streamer of streamers) {
                        if (subtext === streamer.substr(0, subtext.length)) {
                            document.getElementById("keywords").value = ';t ' + streamer;
                            return;
                        }
                    }
                    break;
            }
        }
    }
    if(key == 32){ //Space to go to search
        document.getElementById("keywords").focus();
    }
    sindex = 0;
    cycle = false;
}

function search(text) {
    var option = text.substr(1, text.indexOf(' ') - 1) || text.substr(1);
    var subtext = text.substr(2 + option.length);
    if (text[0] === '/') {
        if (text.indexOf(' ') > -1) {
            switch (option) {
                case "d":
                    window.location = "https://duckduckgo.com/?q=" + subtext;
                    break;
                case "r":
                    window.location = "https://www.reddit.com/search?q=" + subtext;
                    break;
                case "s":
                    window.location = "https://open.spotify.com/search/results/" + subtext;
                    break;
                case "y":
                    window.location = "https://www.youtube.com/results?search_query=" + subtext;
                    break;
            }
        } else {
            var option = text.substr(1);
            switch (option) {
                case "d":
                    window.location = "https://www.dukduckgo.com";
                    break;
                case "y":
                    window.location = "https://www.youtube.com";
                    break;
                case "r":
                    window.location = "https://reddit.com";
                    break;
                case "s":
                    window.location = "https://open.spotify.com";
                    break;
            }
        }
    } else {
        window.location = "https://www.google.com/search?q=" + text;
    }
}


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
