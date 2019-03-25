// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({
	site_id: process.env.TURBO_APP_ID
})
const vertex = require('vertex360')({
	site_id: process.env.TURBO_APP_ID
})
const router = vertex.router()

const profiles = {
	nemsu: {
		username: 'nemsu',
		image: '/images/myAvatar.png',
		name: 'Neni Emmanuel',
		company: 'self',
		languages: [
			'javascript',
			'php',
			'node.js'

		]
	},

	sjobs: {
		username: 'sjobs',
		image: '/images/steve-jobs.jpg',
		name: 'Steve Jobs',
		company: 'apple',
		languages: [
			'objective-c',
			'swift',
			'c++'
		]
	},

	bgates: {
		username: 'bgates',
		image: '/images/gates.jpg',
		name: 'Bill Gates',
		company: 'microsoft',
		languages: [
			'c++',
			'c#',
			'java'
		]
	}
}

// Types of requests
// Post Get Put Delete

router.get('/', (req, res) => {
	res.render('index', {
		text: 'This is the dynamic data. Open index.js from the routes directory to see.'
	})
})

router.get('/profiles', (req, res) => {
	const keys = Object.keys(profiles)
	const list = []
	keys.forEach(key => {
		list.push(profiles[key])
	})

	// const timestamp = new Date()
	const data = {
		profiles: list,
		timestamp: req.timestamp //.toString()
	}

	res.render('profiles', data);
})

router.post('/createprofile', (req, res) => {
	const body = req.body
	body['languages'] = req.body.languages.split(', ')

	profiles[body.username] = body
	res.json({
		confirmation: 'success',
		data: profiles[body.username]
	})

})

router.post('/addprofile', (req, res) => {
	const body = req.body
	body['languages'] = req.body.languages.split(', ')
	profiles[body.username] = body
	res.redirect('/profile/' + body.username)
})

router.get('/query', (req, res) => {
	const name = req.query.name
	const occupation = req.query.occupation

	const data = {
		name: name,
		occupation: occupation
	}

	res.render('profile', data);
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
	const currentProfile = profiles[username]

	if (currentProfile == null) {
		res.json({
			confirmation: 'fail',
			message: 'profile ' + username + ' not found'
		})
		return
	}

	// const timestamp = new Date()
	currentProfile.timestamp = req.timestamp

	res.render('profile', currentProfile);
})

module.exports = router