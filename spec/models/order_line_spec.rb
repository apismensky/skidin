require 'spec_helper'

describe OrderLine do
  describe "Validations" do
    it { should validate_presence_of :product_id }


    context "quantity" do
      it { should validate_presence_of :quantity }
      it "is invalid with == 0" do
        FactoryGirl.build(:order_line1, quantity: 0).should_not be_valid
      end

      it "is valid with == 10" do
        FactoryGirl.build(:order_line1, quantity: 10).should be_valid
      end

      it "is invalid with < 0" do
        FactoryGirl.build(:order_line1, quantity: -1).should_not be_valid
      end

      it "is invalid with string" do
        FactoryGirl.build(:order_line1, quantity: "foobar").should_not be_valid
      end

    end

    context "unit_price" do
      it { should validate_presence_of :unit_price }

      it "is valid with == 0" do
         FactoryGirl.build(:order_line1, unit_price: 0).should be_valid
      end

      it "is valid with == 100" do
         FactoryGirl.build(:order_line1, unit_price: 100).should be_valid
      end

      it "is invalid with < 0" do
        FactoryGirl.build(:order_line1, unit_price: -1).should_not be_valid
      end

      it "is invalid with string" do
        FactoryGirl.build(:order_line1, unit_price: "foobar").should_not be_valid
      end
    end
  end

end
