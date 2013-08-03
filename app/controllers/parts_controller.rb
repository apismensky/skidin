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
    @suggestions = Part.search(query).results
    render json: @suggestions
  end
end