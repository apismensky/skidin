class DiagrampartsController < ApplicationController

  def show
    render json: Diagrampart.find(params[:id])
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