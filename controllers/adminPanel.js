const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', helpers.checkNotAuthenticated, async (req, res) =>{
	users = await db.User.findAll({
		where: {userRole: 1}
	})
	res.render('adminPanel', {
		users: users
	});
});

router.post('/', async (req, res) => {
	let {_userId} = req.body;

	await db.Note.destroy({
		where: {
			userID: _userId
		}
	});

	await db.User.destroy({
		where: {
			id: _userId
		}
	});

	res.redirect("/users/adminPanel");
});

module.exports = router;