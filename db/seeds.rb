Group.create(number: 'Group 1', description: 'Lorem ipsum sit doler amet')


products_path = File.join(File.expand_path( '../test_data', __FILE__ ), "products.txt" )
products_file = File.open(products_path)
products_file.each_line do |product|
	product_id, name, price, points, image_small, image_medium, short_description, medium_description, product_class = product.chomp.split("|")

	prod = Product.find_or_create_by_name(
		{ name: name,
		  price: price,
		  image_small: image_small,
		  image_medium: image_medium,
		  short_description: short_description,
		  medium_description: medium_description} )

	prod.save

end
