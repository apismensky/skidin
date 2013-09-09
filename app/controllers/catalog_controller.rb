require 'product'

class CatalogController < ApplicationController
  def index
    @products = Product.all
  end

  def show
    @product = Product.find(params[:id])
  end

  def order
    cart = Cart.first
    @success = true
    cart.destroy if cart
  end

end
