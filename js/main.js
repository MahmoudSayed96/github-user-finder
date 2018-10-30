// client_id:78add05402dfbe41be9d
// client_secret:17c2b98fa9c1525798ae57b55bf17d5203f1397f
// https://api.github.com/users/MahmoudSayed96

$(function () {
    $('#searchInput').on('keyup', function (e) {
        // Get input value
        let username = e.target.value;
        // Make AJAX request
        $.ajax({
            url: `https://api.github.com/users/${username}`,
            data: {
                client_id: '78add05402dfbe41be9d',
                client_secret: '17c2b98fa9c1525798ae57b55bf17d5203f1397f'
            }
        }).done(function (user) {
            // Make request for repos
            $.ajax({
                url: `https://api.github.com/users/${username}/repos`,
                data: {
                    client_id: '78add05402dfbe41be9d',
                    client_secret: '17c2b98fa9c1525798ae57b55bf17d5203f1397f',
                    sort: 'created: asc',
                    pre_page: 5
                }
            }).done(function (repos) {
                $.each(repos, function (index, repo) {
                    $('#repos').append(`
                        <div class="card card-body">
                            <div class="row">
                                <div class="col-md-7">
                                    <strong>${repo.name}</strong> ${repo.description}
                                </div>
                                <div class="col-md-3">
                                    <span class="badge badge-primary">Forks: ${repo.forks_count}</span>
                                    <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                                    <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" target="_blank" href="btn btn-secondary">Repo Page</a>
                                </div>
                            </div>
                        </div>
                        <br>
                    `);
                });
            });
            $('#profile').html(`
                <div class="card">
                    <div class="card-header">
                        ${user.name}
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3">
                                <img class="img-fluid rounded  mb-2" src="${user.avatar_url}" alt="${user.name}">
                                <a class="btn btn-primary btn-block" href="${user.html_url}" target="_blank">View Profile</a>
                            </div>
                            <div class="col-md-9">
                                <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                                <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                                <span class="badge badge-success">Followers: ${user.followers}</span>
                                <span class="badge badge-danger">Following: ${user.following}</span>
                               <br><br>
                               <ul class="list-group">
                                    <li class="list-group-item">Company: ${user.company}</li>
                                    <li class="list-group-item">Websit /blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                                    <li class="list-group-item">Location: ${user.location}</li>
                                    <li class="list-group-item">Member Since: ${user.created_at}</li>
                               </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <h3>Latest Repos</h3>
                <hr>
                <div id="repos"></div>
           `);
        });
    });
});