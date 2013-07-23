class AddGroup < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :number
      t.string :description
      t.timestamps
    end
  end
end
