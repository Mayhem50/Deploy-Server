var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: 'benjamin' });

var git = require('gitty');
var fs = require('fs');
var path = require('path');

var clone = require('nodegit-clone');


var exec = require('child_process').exec;

function puts(error, stdout, stderr) { console.log(stdout) }

http.createServer(function(req, res) {
    handler(req, res, function(err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(7777)

handler.on('error', function(err) {
    console.error('Error:', err.message)
})

handler.on('push', function(event) {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref);

    var repoPath = path.join('/home/regnier/web/developpement', event.payload.repository.name);

    if (fs.existsSync(repoPath)) {
        console.log('Repo exist : Pull from git');
        var repo = git(repoPath);
        repo.pull(function(err) {
            console.log(err);
        });
    } else {
        console.log('Git clone');
        exec("git clone " + event.payload.repository.html_url + " /home/regnier/web/developpement", puts);
    }
})

handler.on('issues', function(event) {
    console.log('Received an issue event for %s action=%s: #%d %s',
        event.payload.repository.name,
        event.payload.action,
        event.payload.issue.number,
        event.payload.issue.title)
})