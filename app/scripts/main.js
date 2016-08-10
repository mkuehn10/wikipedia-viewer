$(function() {



    var wikiResult = function(title, description, href) {
        var self = this;

        self.title = title;
        self.description = description;
        self.href = href;
    };

    var ViewModel = function() {
        var self = this;

        self.searchTerm = ko.observable('');
        self.wikiResults = ko.observableArray([]);

        self.searchWikipedia = function() {
            //console.log("Search for " + self.searchTerm());
            self.wikiResults([]);
            self.sendWikipediaRequest();
        };

        $('#myInput').keyup(function(event) {
            if (event.keyCode == 13) {
                self.sendWikipediaRequest();
            }
        });

        self.sendWikipediaRequest = function() {
            var params = {
                action: 'opensearch',
                search: self.searchTerm(),
                format: 'json',
                limit: '12',
            };
            $.ajax({
                    url: 'https://en.wikipedia.org/w/api.php?',
                    data: params,
                    dataType: 'jsonp'
                })
                .done(function(result) {
                    //var result = response;
                    var titles = result[1];
                    var descriptions = result[2];
                    var hrefs = result[3];
                    self.processResults(titles, descriptions, hrefs);
                })
                .fail(function(jqXHR, error) {
                    console.log('something went wrong');
                });
        };

        self.processResults = function(titles, descriptions, hrefs) {
            console.log(titles);
            console.log(descriptions);
            console.log(hrefs);
            var resultLength = titles.length;
            for (var i = 0; i < resultLength; i++) {
                self.wikiResults.push(new wikiResult(titles[i], descriptions[i], hrefs[i]));
            }
        };

    };

    ko.applyBindings(new ViewModel);
});
