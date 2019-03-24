// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({
	site_id: process.env.TURBO_APP_ID
})
const vertex = require('vertex360')({
	site_id: process.env.TURBO_APP_ID
})
const router = vertex.router()

router.get('/', (req, res) => {
	res.render('index', {
		text: 'This is the dynamic data. Open index.js from the routes directory to see.'
	})
})

router.get('/query', (req, res) => {
	const name = req.query.name
	const occupation = req.query.occupation

	const data = {
		name: name,
		occupation: occupation
	}

	res.render('profile', data);
	// res.json({
	// 	name: name,
	// 	occupation: occupation
	// });
})

router.get('/test', (req, res) => {
	res.json({
		data: 'This  is a test response'
	});
})

router.get('/:path', (req, res) => {

	const path = req.params.path
	res.json({
		data: path
	});
})

router.get('/:profile/:username', (req, res) => {

	const profile = req.params.profile
	const username = req.params.username

	res.json({
		profile: profile,
		username: username
	});
})

module.exports = router