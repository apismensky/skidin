class Order < ActiveRecord::Base

  attr_accessible :status, :shipping_address, :order_lines

  belongs_to :shipping_address, foreign_key: :shipping_address_id, class_name: 'Address'

  has_many :order_lines

  validates :order_lines, :shipping_address, presence: true
  validates :shipping_address, associated: true

end
