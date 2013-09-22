class DiagrampartsController < ApplicationController


#  def index
#    @products = Diagrampart.where("sysid in (229,495,516,497, 519, 583, 508, 506)").limit 16
#  end

#  def show
#    @product = Diagrampart.find_by_sysid(params[:id])
#  end

  def find_by_did
    @parts = Diagrampart.where("did='#{params['did']}'")
    render json: @parts
  end

#  def order
#    cart = Cart.first
#    @success = true
#    cart.destroy if cart
#  end

end