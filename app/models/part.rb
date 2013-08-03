class Part
  include Mongoid::Document

  field :company, type: String
  field :manufacturer, type: String
  field :number, type: String
  field :description, type: String
  field :qty_on_hand, type: Integer
  field :cost, type: String # todo

end