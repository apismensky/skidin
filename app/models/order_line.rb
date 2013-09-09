class OrderLine < ActiveRecord::Base

  attr_accessible :product, :product_id, :quantity, :unit_price

  validates :product_id, :quantity, :unit_price, presence: true
  validates :quantity, :numericality => { :only_integer => true, :greater_than => 0}
  validates :unit_price, :numericality => { :only_integer => true, :greater_than_or_equal_to => 0}

  belongs_to :product
end
