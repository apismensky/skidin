class Model < ActiveRecord::Base
  self.table_name = 'model'
  attr_accessible :id, :sid, :bid, :name, :region
end