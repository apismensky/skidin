class Address < ActiveRecord::Base
  attr_accessible :name, :email, :line_1, :line_2, :city, :state, :postal_code, :country, :phone_number

  validates :name, :line_1, :city, :state, :postal_code, :phone_number, presence: true
end