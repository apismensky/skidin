class PartsController < ApplicationController
  def index
    render json: Part.all
  end

  def show
    render json: Part.find(params[:id])
  end

  def search
    query = params[:q]
    render json: [] and return if query.blank?
    query.strip!
    puts "QUERY: #{query}"
    rs = Part.tire.search(load: true, page: params[:page], per_page: 10) do
      query { string query, default_operator: "AND" } if query.present?
    end
    @suggestions = rs.results
    render json: @suggestions
  end
end