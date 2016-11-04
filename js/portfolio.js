(function () {
    function getGithubData() {
        $.get("https://api.github.com/users/oscarasoto/repos", {
            type:   "all"
        }).fail(function (error) {
            console.log(error);
        }).done(function(githubData) {
            console.log(githubData);
            buildPortfolio(githubData)
        });
    }

getGithubData();


    function buildPortfolio(githubData) {

        var htmlPortfolioContent = "";
        githubData.forEach(function (project) {
            console.log(project.name.replace(/[-_]/g, " "));
            console.log(project.description);
            console.log(project.homepage);

            htmlPortfolioContent += "<div class='col-xs-6 project'><a href='" + project.homepage +
                "'><img class='project-img' " + "src='img/redfoxforce.png'>" +
                "<div class='details'><h3>" + project.name.replace(/[-_]/g, " ") + "</h3><p><strong>"
                + project.description + "</strong></p></div></a></div>"


        });

        $("#portfolio-container").html(htmlPortfolioContent);
    }

/*

    <div class=col-xs-6 project'>
        <a href="#">
        <img class="project-img" src="img/redfoxforce.png">
        <div class="details">
        <h3>Red Fox Force</h3>
    <p><strong>Mobile, Web Design</strong></p>
    </div>

    </a>
    </div>
*/


})();

/*
https://raw.githubusercontent.com/oscarasoto/MyWebSite/master/img/drivesafe1.png
 */