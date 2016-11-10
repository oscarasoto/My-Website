

$(document).ready(function(){
    var header = $('body');

    var backgrounds = ["url('img/man-walking.jpg')"
        , "url('img/home-main-slide-2.jpg')"
        , "url('img/home-main-slide-3.jpg')"];
    var current = 0;

    function nextBackground() {
        current++;
        current = current % backgrounds.length;
        header.css('background-image', backgrounds[current]);
    }
    setInterval(nextBackground, 4000);

    header.css('background-image', backgrounds[0]);

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
    showMap()

});



/*

<video loop muted autoplay poster="img/man-walking.jpg" class="fullscreen-bg__video">
    <source src="img/man-walking.mp4" type="video/mp4">
</video>
    */
