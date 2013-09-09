require 'spec_helper'

describe Product do
  let( :valid_attr) { FactoryGirl.attributes_for :product }

  it{ should validate_presence_of :name }

  context 'with valid data' do
    subject{ Product.new( valid_attr ) }

    it{ should be_valid }
    its( :name ){ should eq valid_attr[:name] }
    its( :medium_description ){ should eq valid_attr[:medium_description] }
  end

  context 'with invalid data' do
    subject{ Product.new }
    it{ should_not be_valid }
  end

end
