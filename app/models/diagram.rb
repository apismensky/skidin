class Diagram < ActiveRecord::Base
  self.table_name = 'diagram'
  attr_accessible :id, :pid, :sgid, :name, :image
end