module.exports = (sequelize, DataTypes) =>{
	const Note = sequelize.define('Note',{
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		content: {
			type: DataTypes.STRING
		}
	}, {
		tableName: 'Notes'
	});

	Note.associate = models => {
		Note.belongsTo(models.User, {
			foreignKey:{
				name: 'userID',
				allowNull: false
			}
		});
	}

	return Note;
}
