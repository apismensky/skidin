require 'spec_helper'

describe Address do

  let( :valid_attr ) { FactoryGirl.attributes_for :address1 }

  it{ should validate_presence_of :name }
  it{ should validate_presence_of :line_1 }
  it{ should validate_presence_of :city }
  it{ should validate_presence_of :state }
  it{ should validate_presence_of :postal_code }
  it{ should validate_presence_of :phone_number }

  it{ should respond_to :email }
  it{ should respond_to :country }

  context 'with valid data' do
    subject{ Address.new valid_attr }

    it{ should be_valid }

    [:name, :line_1, :city, :state, :postal_code, :email, :country, :phone_number].each do |field|
      its( field ){ should eq valid_attr[field] }
    end
  end

  context 'with invalid data' do
    subject{ Order.new }
    it{ should_not be_valid }
  end

end
