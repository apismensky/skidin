class Diagrampart < ActiveRecord::Base

  include Tire::Model::Search
  include Tire::Model::Callbacks

  self.table_name = 'diagramparts'
  self.primary_key = 'sysid'
  attr_accessible :sysid, :id, :did, :dno, :description, :supplement, :qty, :fromdate, :uptodate, :partno, :price, :notes, :photo

  def to_indexed_json
    to_json
  end

end