class CreateCart < ActiveRecord::Migration
  def change
    create_table :carts do |t|
      t.integer :account_id
      t.timestamps
    end

    add_index "carts", ["account_id"], :name => "index_carts_on_account_id"

    create_table :cart_items do |t|
      t.integer :cart_id
      t.integer :quantity
      t.string :product_id

      t.timestamps
    end

    add_index "cart_items", ["cart_id"], :name => "index_cart_items_on_cart_id"

  end
end
