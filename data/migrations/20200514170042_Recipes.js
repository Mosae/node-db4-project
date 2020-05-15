exports.up = function (knex) {
	// 1 recipe has many ingridients
	return knex.schema
		.createTable('Recipes', (tbl) => {
			tbl.increments();
			tbl.string('Recipe_Name', 255).notNullable();
		})
		.createTable('Ingredients', (tbl) => {
			tbl.increments();
			tbl.string('Ingredient', 255).notNullable();
			//create a foreign key that points to the recipe table
			tbl
				.float('Quantity')
				.unsigned() //integers must be positive - always add this
				.notNullable() //required
				.refrences('id') //this should refere to the id in the recipe table
				.inTable('Recipes');
		})
		.createTable('Instructions', (tbl) => {
			tbl
				.increments()
				.tbl.string('Steps', 255)
				.notNullable()
				.refrences('id')
				.inTable('Recipes');
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('Instructions')
		.dropTableIfExists('Ingredients')
		.dropTableIfExists('Recipes');
};
