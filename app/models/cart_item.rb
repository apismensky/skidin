class CartItem < ActiveRecord::Base

  attr_accessible :product_id, :quantity
  belongs_to :diagrampart, primary_key: 'sysid', :foreign_key => 'product_id'
  validates :product_id, :quantity, presence: true
  validates :quantity, :numericality => { :only_integer => true, :greater_than => 0, :less_than => 100}

  def price
    diagrampart ? (self.quantity * diagrampart.price) : 0
  end

end