class CartController < ApplicationController

  def index
    @cart = cart_for_user
    @address = address_for_user
  end

  def create
    add_cart
    redirect_to :action => :index
  end

  def modalcreate
    add_cart
    redirect_to :action => :ok
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

  def add_cart
    product_id = params[:product_id]
    @cart = cart_for_user

    unless @cart
      @cart = Cart.new
      @cart.account_id = nil
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
  end

  def cart_for_user
    Cart.first || Cart.new
  end

  def address_for_user 
    Address.first || Address.new
  end

end
