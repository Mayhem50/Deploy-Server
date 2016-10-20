var express = require('express');
var router = express.Router();

var path = require('path');

var createHandler = require('github-webhook-handler');
var handler = createHandler({ path: '/', secret: 'benjamin' });

/* GET users listing. */
router.get('/', function(req, res, next) {
    handler(req, res, function(err) {
        res.statusCode = 404;
        res.end('no such location');
    });
});

handler.on('error', function(err) {
    console.error('Error:', err.message);
});

handler.on('push', function(event) {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref);

    var repoPath = path.join('/home/regnier/web/developpement', event.payload.repository.name);

    if (fs.existsSync(repoPath)) {
        console.log('Repo exist : Pull from git');
        exec("cd /home/regnier/web/developpement/" + event.payload.repository.name + " && git pull", puts);
    } else {
        console.log('Git clone');
        exec("git clone " + event.payload.repository.html_url + " /home/regnier/web/developpement/" + event.payload.repository.name, puts);
    }
});

module.exports = router;