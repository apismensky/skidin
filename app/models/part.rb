class Part
  #include Mongoid::Document
  #include Tire::Model::Search
  #include Tire::Model::Callbacks
  #
  #field :company, type: String
  #field :manufacturer, type: String
  #field :number, type: String
  #field :description, type: String
  #field :qty_on_hand, type: Integer
  #field :cost, type: String # todo
  #
  #mapping do
  #   indexes :_id, index: :not_analyzed
  #   indexes :description, analyzer: 'snowball'
  #   indexes :number, index: :not_analyzed
  #   indexes :manufacturer
  #end
  #
  #def to_indexed_json
  #  to_json
  #end

end