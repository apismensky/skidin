class TireController < ApplicationController
  def search
     query = params[:q]
     render json: [] and return if query.blank?
     query.strip!
     puts "QUERY: #{query}"
     rs = Diagrampart.tire.search(load: true, page: params[:page], per_page: 10) do
       query { string query, default_operator: "AND" } if query.present?
     end
     @products = rs.results
     render html: @products
   end
end