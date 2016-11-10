(function () {
    function getGithubData() {
        $.get("https://api.github.com/users/oscarasoto/repos", {
            type:   "all"
        }).fail(function (error) {
            console.log(error);
        }).done(function(githubData) {
            buildPortfolio(githubData)
        });
    }

    function buildPortfolio(githubData) {

        var resumeQuery = window.location.href;
        var queryLanguage = null;
        var htmlPortfolioContent = "";

        if (resumeQuery.indexOf("=") != -1) {
            queryLanguage = resumeQuery.slice(resumeQuery.indexOf("=")+1, resumeQuery.length);
        }

        githubData.forEach(function (project) {

            if (!queryLanguage) {
                htmlPortfolioContent += "<div class='col-xs-6 project'><a href='" + project.homepage +
                    "'><img class='project-img' " + "src='https://github.com/oscarasoto/My-Website/raw/master/img/" + project.name + "_thumbnail.png'>" +
                    "<div class='details'><h3>" + project.name.replace(/[-_]/g, " ") + "</h3><p><strong>"
                    + project.description + "</strong></p></div></a></div>";

            } else if (project.language == queryLanguage) {
                htmlPortfolioContent += "<div class='col-xs-6 project'><a href='" + project.homepage +
                    "'><img class='project-img' " + "src='https://github.com/oscarasoto/My-Website/raw/master/img/" + project.name + "_thumbnail.png'>" +
                    "<div class='details'><h3>" + project.name.replace(/[-_]/g, " ") + "</h3><p><strong>"
                    + project.description + "</strong></p></div></a></div>";
            }

        });

        $("#portfolio-container").html(htmlPortfolioContent);
    }

    function changeBackground() {
        var header = $('body');

        var backgrounds = ["url('img/man-walking.jpg')"
            , "url('img/home-main-slide-2.jpg')"
            , "url('img/home-main-slide-3.jpg')"];
        //var current = 0;

        /*function nextBackground() {
            current++;
            current = current % backgrounds.length;
            header.css('background-image', backgrounds[current]);
        }
        setInterval(nextBackground, 4000);*/

        header.css('background', backgrounds[2] + "no-repeat 50% 50% fixed");
        header.css("background-size", "cover");
    }

    function showMap() {

        // Set our map options
        var geekdom = {lat: 29.426383, lng: -98.493463};
        var mapOptions = {
            // Set the zoom level
            zoom: 16,

            // This sets the center of the map at our location
            center: geekdom
        };


        // Render the map
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);


        // Add the marker to our existing map
        var marker = new google.maps.Marker({
            position: geekdom,
            map: map,
            animation: google.maps.Animation.DROP
        });

        $("#mapModal").on("shown.bs.modal", function () {
            google.maps.event.trigger(map, "resize");
            map.setCenter(new google.maps.LatLng(geekdom))
        });

        // Create a new infoWindow object with content
        var contentString = "Changing the world, one program at a time.";
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        marker.addListener('click', toggleBounce);

        function toggleBounce() {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                // Open the window using our map and marker
                infowindow.open(map, marker);
            }
        }

    }

    getGithubData();
    changeBackground();
    showMap();
})();
