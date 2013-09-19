# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130919161135) do

  create_table "addresses", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "line_1"
    t.string   "line_2"
    t.string   "city"
    t.string   "state"
    t.string   "postal_code"
    t.string   "country"
    t.string   "phone_number"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  create_table "body", :id => false, :force => true do |t|
    t.string "id",   :limit => 3,  :null => false
    t.string "name", :limit => 10, :null => false
  end

  create_table "cart_items", :force => true do |t|
    t.integer  "cart_id"
    t.integer  "quantity"
    t.string   "product_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "cart_items", ["cart_id"], :name => "index_cart_items_on_cart_id"

  create_table "carts", :force => true do |t|
    t.integer  "account_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "carts", ["account_id"], :name => "index_carts_on_account_id"

  create_table "diagram", :id => false, :force => true do |t|
    t.string "id",    :limit => 15,  :null => false
    t.string "pid",   :limit => 20,  :null => false
    t.string "sgid",  :limit => 5,   :null => false
    t.string "name",  :limit => 200, :null => false
    t.string "image", :limit => 100
  end

  create_table "diagramparts", :id => false, :force => true do |t|
    t.string  "id",          :limit => 20,                                                    :null => false
    t.string  "did",         :limit => 15,                                                    :null => false
    t.integer "dno"
    t.string  "description", :limit => 200
    t.string  "supplement",  :limit => 50
    t.integer "qty"
    t.date    "fromdate"
    t.date    "uptodate"
    t.string  "partno",      :limit => 11,                                                    :null => false
    t.decimal "price",                      :precision => 19, :scale => 2
    t.string  "notes",       :limit => 100
    t.boolean "photo",                                                     :default => false
    t.integer "sysid"
  end

  create_table "groups", :id => false, :force => true do |t|
    t.integer "id",                  :null => false
    t.string  "name", :limit => 100, :null => false
  end

  create_table "model", :id => false, :force => true do |t|
    t.string "id",     :limit => 10, :null => false
    t.string "sid",    :limit => 4,  :null => false
    t.string "bid",    :limit => 3,  :null => false
    t.string "name",   :limit => 40, :null => false
    t.string "region", :limit => 3,  :null => false
  end

  create_table "order_lines", :force => true do |t|
    t.integer  "product_id"
    t.integer  "order_id"
    t.integer  "quantity"
    t.integer  "unit_price"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "orders", :force => true do |t|
    t.string   "status"
    t.integer  "shipping_address_id"
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
  end

  create_table "prodcode", :id => false, :force => true do |t|
    t.string "id",          :limit => 10,  :null => false
    t.string "mid",         :limit => 10,  :null => false
    t.string "bid",         :limit => 3,   :null => false
    t.string "sid",         :limit => 4,   :null => false
    t.string "region",      :limit => 3,   :null => false
    t.string "engine",      :limit => 10,  :null => false
    t.string "steering",    :limit => 1
    t.string "description", :limit => 200
  end

  create_table "prodcodedate", :id => false, :force => true do |t|
    t.string "id",        :limit => 20, :null => false
    t.string "pid",       :limit => 10, :null => false
    t.date   "prodmonth",               :null => false
  end

  create_table "products", :force => true do |t|
    t.string   "name"
    t.string   "short_description"
    t.string   "medium_description"
    t.string   "long_description"
    t.string   "image_small"
    t.string   "image_medium"
    t.integer  "price"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
  end

  create_table "series", :id => false, :force => true do |t|
    t.string "id",   :limit => 4,  :null => false
    t.string "name", :limit => 30, :null => false
  end

  create_table "subgroups", :id => false, :force => true do |t|
    t.string  "id",   :limit => 5,   :null => false
    t.integer "gid"
    t.integer "sid",                 :null => false
    t.string  "name", :limit => 100, :null => false
  end

end
