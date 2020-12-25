const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', helpers.checkNotAuthenticated, async (req, res) =>{
	notes = await db.Note.findAll({
		where: {userID: req.user.id}
	})
	res.render('dashboard', {
		notes: notes
	});
});

router.post('/', async (req, res) => {
	let {_noteId} = req.body;

	await db.Note.destroy({
		where: {
			id: _noteId
		}
	})

	res.redirect("/users/dashboard");
});

module.exports = router;