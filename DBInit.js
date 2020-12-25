const db = require('./models');

db.User_Role.bulkCreate([
	{
		name: 'user'
	},
	{
		name: 'admin'
	}
]);