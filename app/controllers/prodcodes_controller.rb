class ProdcodesController < ApplicationController


  def find_by_sid_bid_mid_reg
    @prodcodes = Prodcode.where(" mid='#{params['mid']}' and bid='#{params['bid']}' and sid='#{params['sid']}' and region='#{params['region']}'  ")
    render json: @prodcodes
  end

end
