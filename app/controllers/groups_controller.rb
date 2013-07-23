class GroupsController < ApplicationController
  def index
    @groups = Group.all
    render json: @groups
  end

  def show
    @group = Group.find params[:id]
    render json: @group
  end
end
