class ProdcodedatesController < ApplicationController


  def find_by_pid
    @prodcodedates = Prodcodedate.where(" pid='#{params['pid']}'")
    render json: @prodcodedates
  end

end
