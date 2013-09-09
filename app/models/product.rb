class Product < ActiveRecord::Base
  attr_accessible :name, :short_description, :medium_description, 
                  :long_description, :image_small, :image_medium, 
                  :price

  validates :name, :price, presence: true

end
