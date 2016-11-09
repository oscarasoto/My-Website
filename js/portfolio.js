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

        header.css('background-image', backgrounds[2]);
    }

    getGithubData();
    changeBackground();
})();
