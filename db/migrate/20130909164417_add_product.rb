class AddProduct < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.string :short_description
      t.string :medium_description
      t.string :long_description
      t.string :image_small
      t.string :image_medium
      t.integer :price

      t.timestamps
    end

    create_table :orders do |t|
      t.string :status
      t.integer :shipping_address_id

      t.timestamps
    end

    create_table :order_lines do |t|
      t.integer :product_id
      t.integer :order_id
      t.integer :quantity
      t.integer :unit_price

      t.timestamps
    end

    create_table :addresses do |t|
      t.string :name
      t.string :email
      t.string :line_1
      t.string :line_2
      t.string :city
      t.string :state
      t.string :postal_code
      t.string :country
      t.string :phone_number

      t.timestamps
    end

  end

end
