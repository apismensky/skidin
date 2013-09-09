class CartController < ApplicationController

  def index
    @cart = cart_for_user
    @address = address_for_user
  end

  def create
    product_id = params[:product_id]
    @cart = cart_for_user

    unless @cart
      @cart = Cart.new
      @cart.account_id = current_account.id
    end

    found = false

    @cart.cart_items.each do |c|
      if c.product_id == product_id
        c.quantity += 1
        c.save
        found = true
      end
    end

    unless found
      cart_item = CartItem.new
      cart_item.product_id = product_id
      cart_item.quantity = 1
      @cart.cart_items << cart_item
    end

    @cart.save
    redirect_to :action => :index
  end

  def destroy
    CartItem.find_by_id(params[:id]).destroy
    redirect_to :action => :index
  end

  def update
    @cart = cart_for_user
    quantities = params[:quantity]

    Array(quantities).each_with_index { |qty, i|
      cart_item = @cart.cart_items[i]
      cart_item.quantity = qty
      cart_item.save
    }

    redirect_to :action => :index
  end

  private

  def cart_for_user
    Cart.find_by_account_id current_account.id
  end

  def address_for_user 
    current_account.addresses.first || Address.new
  end

end
