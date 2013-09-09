require 'spec_helper'

describe Cart do
  describe "Validations" do
    it { should have_many :cart_items }
  end

  describe "#total" do
    let(:cart) { Cart.new account_id: 1, cart_items: [] } 

    context "with an empty cart" do
      it "returns 0" do  
        cart.total.should eq 0 
      end
    end

  end
end
