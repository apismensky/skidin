class SeriesController < ApplicationController

  def index
    @series = Serie.all
    render json: @series
  end

end
