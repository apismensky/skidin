#Group.create(number: 'Group 1', description: 'Lorem ipsum sit doler amet')


#products_path = File.join(File.expand_path( '../test_data', __FILE__ ), "products.txt" )
#products_file = File.open(products_path)
#products_file.each_line do |product|
#	product_id, name, price, points, image_small, image_medium, short_description, medium_description, product_class = product.chomp.split("|")
#
#	prod = Product.find_or_create_by_name(
#		{ name: name,
#		  price: price,
#		  image_small: image_small,
#		  image_medium: image_medium,
#		  short_description: short_description,
#		  medium_description: medium_description} )
#
#	prod.save
#
#end
# 'skidin_ddl_nofk.sql', 'insert_groups.sql', 'insert_subgroups.sql',
#  'E81.sql', 'E60.sql', 'E60N.sql', 'E63N.sql', 'E81.sql', 'E87.sql', 'E90N.sql', 'F04.sql', 'F13.sql', 'RR3N.sql'

files = ['E65.sql', 'E70.sql', 'E84.sql', 'E85.sql', 'F01.sql', 'F25.sql']
connection = ActiveRecord::Base.connection

files.each do |f|
  sql = File.read("db/skidin/#{f}")
  statements = sql.split(/;$/)
  statements.pop # the last empty statement
  statements.each do |statement|
    statement.strip!
    puts "Statement: |#{statement}|"
    begin
      connection.execute(statement)
    rescue => ex
      puts ex
    end
  end

end


