

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
});



/*

<video loop muted autoplay poster="img/man-walking.jpg" class="fullscreen-bg__video">
    <source src="img/man-walking.mp4" type="video/mp4">
</video>
    */
