class CartItem < ActiveRecord::Base

  attr_accessible :product_id, :quantity
  belongs_to :product
  validates :product_id, :quantity, presence: true
  validates :quantity, :numericality => { :only_integer => true, :greater_than => 0, :less_than => 100}

  def price
    product ? (self.quantity * product.price) : 0
  end

end