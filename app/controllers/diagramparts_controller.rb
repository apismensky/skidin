class DiagrampartsController < ApplicationController


  def index
    @products = Diagrampart.where("sysid in (37822, 38002, 38084, 38605, 38872, 39122, 39650, 39956, 40286, 40360)").limit 16
  end

  def show
    @product = Diagrampart.find_by_sysid(params[:id])
  end

  def find_by_partno
    @parts = Diagrampart.where("partno='#{params['partno']}'")
    render json: @parts
  end

  def find_by_did
    @parts = Diagrampart.where("did='#{params['did']}'")
    render json: @parts
  end

    def match_by_did
    @parts = Diagrampart.where("did like '#{params['did']}%'")
    render json: @parts
  end

  def order
    cart = Cart.first
    @success = true
    cart.destroy if cart
  end

end