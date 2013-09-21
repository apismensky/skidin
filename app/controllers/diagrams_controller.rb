class DiagramsController < ApplicationController


  def find_by_pid_sgid
    @diagrams = Diagram.where("pid='#{params['pid']}' and sgid='#{params['sgid']}'")
    render json: @diagrams
  end

end
