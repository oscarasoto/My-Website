(function () {


    function getGithubData() {
        $.get("https://api.github.com/users/oscarasoto/repos", {
            type:   "all"
        }).fail(function (error) {
            console.log(error);
        }).done(function(githubData) {
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

    getGithubData();


})();