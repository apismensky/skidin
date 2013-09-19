class Body < ActiveRecord::Base
  self.table_name = 'body'
  attr_accessible :id, :name
end