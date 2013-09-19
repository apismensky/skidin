class DiagrampartsController < ApplicationController

  def index
    @products = Diagrampart.where("sysid in (229,495,516,497, 519, 583, 508, 506)").limit 16
  end

  def show
    @product = Diagrampart.find_by_sysid(params[:id])
  end

  def order
    cart = Cart.first
    @success = true
    cart.destroy if cart
  end

  def search
    query = params[:q]
    render json: [] and return if query.blank?
    query.strip!
    puts "QUERY: #{query}"
    rs = Diagrampart.tire.search(load: true, page: params[:page], per_page: 10) do
      query { string query, default_operator: "AND" } if query.present?
    end
    @suggestions = rs.results
    render json: @suggestions
  end
end