class ModelsController < ApplicationController

  def index
    @models = Model.all
    render json: @models
  end

  def find_by_sid_bid
    @models = Model.where("sid='#{params['sid']}' and bid='#{params['bid']}'")
    render json: @models
  end

  def find_by_sid
    @models = Model.where("sid='#{params['sid']}'")
    render json: @models
  end

end
