class SubgroupsController < ApplicationController
  def find_by_gid_sid
    @subgroups = Subgroup.where(" gid='#{params['gid']}' and sid='#{params['sid']}'")
    render json: @subgroups
  end

  def find_by_gid
    @subgroups = Subgroup.where(" gid='#{params['gid']}'")
    render json: @subgroups
  end

end
