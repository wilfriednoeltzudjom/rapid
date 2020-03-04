const rapid = require('../rapid');

const router = rapid.Router();

const render = require('../helpers/render');

router.get('/', async (req, res) => {
  try {
    const contents = await render('index');

    res.writeHead(200, { 'Content-type': 'text/html' });
    return res.end(contents);
  } catch (error) {
    
  }
})

module.exports = router;