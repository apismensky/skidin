class Prodcodedate < ActiveRecord::Base
  self.table_name = 'prodcodedate'

  #
  # id character(20) NOT NULL,
  #  pid character(10) NOT NULL,
  #  prodmonth date NOT NULL,
  #  CONSTRAINT prodcodedate_pkey PRIMARY KEY (id)
  #

  attr_accessible :id, :pid, :prodmonth
end