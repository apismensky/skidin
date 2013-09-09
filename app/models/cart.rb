class Cart < ActiveRecord::Base
  attr_accessible :account_id, :cart_items

  has_many :cart_items, :dependent => :delete_all

  def total
    cart_items.inject(0) { |t,ci| t += ci.price } if cart_items
  end

end
