require 'spec_helper'

describe CartItem do

  it { should validate_presence_of :quantity }
  it { should_not allow_value(0).for :quantity }
  it { should_not allow_value(-1).for :quantity }
  it { should_not allow_value('word').for :quantity }

  describe "#points" do

    let(:diagrampart) { Diagrampart.new description: "a really great product", price: 100 }
    let(:cart_item) {
      cart_item = CartItem.new product_id: "2", quantity: 2
      cart_item.diagrampart = diagrampart
      cart_item
    }

    context "with a valid product" do
      it "calculated as points per unit multiplied by quantity" do
        cart_item.price.should eq diagrampart.price * cart_item.quantity
      end
    end

    context "with no valid product" do
      it "returns zero" do
        ci = cart_item
        ci.diagrampart =  nil
        cart_item.price.should eq 0
      end
    end
  end
end
