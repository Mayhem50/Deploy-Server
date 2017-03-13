var path = require('path');
var fs = require('fs');

var gitHubWebhook = require('express-github-webhook');
var handler = gitHubWebhook({ path: '/webhook', secret: 'benjamin' });

handler.on('error', function(err) {
    console.error('Error:', err.message);
});

handler.on('push', function(repo, data) {
    console.log(repo);
    console.log(data);

    var repoPath = path.join('/home/regnier/web/developpement', repo);

    if (fs.existsSync(repoPath)) {
        console.log('Repo exist : Pull from git');
        exec("cd /home/regnier/web/developpement/" + repo + " && git pull", puts);
    } else {
        console.log('Git clone');
        exec("git clone " + data.repository.html_url + " /home/regnier/web/developpement/" + repo, puts);
    }
});

module.exports = handler;