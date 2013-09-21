class ProdcodesController < ApplicationController


  def find_by_sid_bid_mid_reg_ste
    @prodcodes = Prodcode.where(" mid='#{params['mid']}' and bid='#{params['bid']}' and sid='#{params['sid']}' and region='#{params['region']}' and steering='#{params['steering']}' ")
    render json: @prodcodes
  end

end
