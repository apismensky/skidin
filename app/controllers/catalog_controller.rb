require 'product'

class CatalogController < ApplicationController
  def index
    @products = Product.all
  end

  def show
    @product = Product.find(params[:id])
  end

  #def order
  #  cart = Cart.find_by_account_id current_account.id
  #  @success = Order.place_order(cart, Order.shipping_address(params).merge({email: current_account.email}))
  #  cart.destroy if cart
  #end

end
