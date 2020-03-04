const rapid = require('../rapid');

const router = rapid.Router();

const render = require('../helpers/render');

router.get('/', async (req, res) => {
  const contents = await render('index');

  res.writeHead(200, { 'Content-type': 'text/html' });
  res.end(contents);
})

module.exports = router;