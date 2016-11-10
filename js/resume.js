(function () {


    function getGithubData() {
        $.get("https://api.github.com/users/oscarasoto/repos", {
            type: "all"
        }).fail(function (error) {
            console.log(error);
        }).done(function (githubData) {
            buildProjectsLinks(githubData)
        });
    }

    function buildProjectsLinks(githubData) {

        var projectsCount = {
            HTML: 0,
            JavaScript: 0
        };

        githubData.forEach(function (project) {

            projectsCount[project.language]++;

            $('#' + project.language).html("- " + projectsCount[project.language] + " Projects");
            $('#' + project.language).attr("href", "portfolio.html?language=" + project.language);


        });

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
    showMap();

})();