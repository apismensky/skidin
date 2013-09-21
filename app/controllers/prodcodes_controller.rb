class ProdcodesController < ApplicationController


  def find_by_sid_bid_mid_reg_ste
    @prodcodes = Prodcode.where(" mid='#{params['mid']}' and bid='#{params['bid']}' and sid='#{params['sid']}' and region='#{params['region']}' and steering='#{params['steering']}' ")
    render json: @prodcodes
  end

  def find_by_sid_bid_mid_reg_ste_eng
    @prodcodes = Prodcode.where(" mid='#{params['mid']}' and bid='#{params['bid']}' and sid='#{params['sid']}' and region='#{params['region']}' and steering='#{params['steering']}' and engine='#{params['engine']}' ")
    render json: @prodcodes
  end

end
