class PartsController < ApplicationController
  def index
    render json: Part.all
  end

  def show
    render json: Part.find(params[:id])
  end
end