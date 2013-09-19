class BodiesController < ApplicationController

  def index
    @body = Body.all
    render json: @body
  end

end
