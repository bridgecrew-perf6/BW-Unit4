// Imports
const router = require('express').Router();
const Users = require('../users/users-model');
const { checkUser, restricted } = require('../middleware/middleware');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../users/secrets');

// Endpoints
router.get('/', restricted, (req, res, next) => {
	Users.get()
		.then(users => {
			res.json(users);
		})
		.catch(next);
});

router.post('/register', (req, res, next) => {
	const user = req.body;
	const hash = bcrypt.hashSync(user.password, 12);
	user.password = hash;

	Users.add(req.body)
		.then(user => {
			res.status(201).json(user);
		})
		.catch(next);
});

const generateToken = user => {
	const payload = {
		subject: user.user_id,
		username: user.username,
		password: user.password
	};

	return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};

router.post('/login', checkUser, (req, res, next) => {
	const { username, password } = req.body;

	if (bcrypt.compareSync(password, req.user.password)) {
		const token = generateToken(req.user);
		res.json({ message: 'Dinner time!', token });
	} else {
		next({ status: 401, message: 'Are you sure you are related?' });
	}
});

// Exports
module.exports = router;