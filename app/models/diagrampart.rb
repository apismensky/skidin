class Diagrampart < ActiveRecord::Base

  include Tire::Model::Search
  include Tire::Model::Callbacks

  self.table_name = 'diagramparts'
  attr_accessible :id, :did, :dno, :description, :supplement, :qty, :fromdate, :uptodate, :partno, :price, :notes, :photo

  def to_indexed_json
    to_json
  end

end