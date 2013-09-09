require 'spec_helper'

describe CartController do

	describe '#index' do
		it "assigns the user's cart" do
			cart = stub('Cart')
			controller.stub(:cart_for_user) { cart }
			controller.stub(:address_for_user) { nil }
			get :index
			assigns(:cart).should eq cart
		end

		it "assigns the user's address" do
			controller.stub(:cart_for_user) { nil }
			address = stub('Address')
			controller.stub(:address_for_user) { address }
			
			get :index
			
			assigns(:address).should eq address
		end
	end

	describe '#create' do

		context "when the current user does not have a cart" do
			it "creates a cart" do
				controller.stub(:cart_for_user) { nil }
				current_account = stub('Current Acount',id: 1)
				controller.stub(:current_account) { current_account }

				post :create
				
				assigns(:cart).should_not be_nil
			end
		end

		context "when the current user has a cart" do
			it "does not create a cart" do
				cart_for_user = Cart.new
				controller.stub(:cart_for_user) { cart_for_user }

				Cart.should_not_receive(:new)

				post :create
			end

			context "when adding a new product to the cart" do
				it "new product is added" do
					cart_for_user = Cart.new
					cart_for_user.cart_items.build product_id: 1, quantity: 2 
					controller.stub(:cart_for_user) { cart_for_user }

					post :create, :product_id => 2

					cart_items = assigns(:cart).cart_items
					cart_items[0].quantity.should eq 2
					cart_items[1].quantity.should eq 1
				end
			end

			context "when adding an existing product to the cart" do
				it "updates the product count" do
					cart_for_user = Cart.new
					cart_for_user.cart_items.build product_id: 1, quantity: 2 
					controller.stub(:cart_for_user) { cart_for_user }

					post :create, :product_id => 1

					assigns(:cart).cart_items[0].quantity.should eq 2
				end
			end
		end

	end

	 describe "PUT #update" do
    it "update the entry(s) in the cart (QTY)" do
			cart = Cart.new
    	cart.cart_items = [ CartItem.new(quantity: 1), CartItem.new(quantity: 2) ]
			controller.stub(:cart_for_user) { cart }

			put :update, :quantity => [2,7]

			cart_items = assigns(:cart).cart_items
			cart_items[0].quantity.should eq 2
			cart_items[1].quantity.should eq 7
    end
  end

  describe "DELETE #destroy" do
    it "drops the record from the cart_items" do
			cart_item = stub('Item to Destroy')
			cart_item.should_receive(:destroy)
			CartItem.stub(:find_by_id).with("1") { cart_item }

			delete :destroy, :id => 1
    end
  end

  describe "#cart_for_user" do
    it "returns a cart for the current account" do
      controller.stub(:current_account) { mock('account',:id => 1) }
      Cart.should_receive :all
      controller.send :cart_for_user
    end
  end

  describe "#address_for_user" do
    context "when current_account has an address" do
      it "returns the current_accounts address" do
        controller.stub(:current_account) { mock('account_with_address', :addresses => [1]) }
        controller.send :address_for_user
      end
    end

    context "when current_account has no address" do
      it "returns a new address" do
        controller.stub(:current_account) { mock('account_with_address', :addresses => []) }
        result = controller.send :address_for_user
        result.should be_kind_of Address
      end
    end
  end

end
