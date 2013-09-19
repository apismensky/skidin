class Prodcode < ActiveRecord::Base
  self.table_name = 'prodcode'

  #id character(10) NOT NULL,
  #  mid character(10) NOT NULL,
  #  bid character(3) NOT NULL,
  #  sid character(4) NOT NULL,
  #  region character(3) NOT NULL,
  #  engine character varying(10) NOT NULL,
  #  steering character(1),
  #  description character varying(200)
  #
  attr_accessible :id, :mid, :bid, :sid, :region, :engine, :steering, :description
end