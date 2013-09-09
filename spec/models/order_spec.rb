require 'spec_helper'

describe Order do

  it{ should respond_to :status }
  it{ should respond_to :shipping_address }
  it{ should respond_to :order_lines }

  it{ should validate_presence_of :order_lines }
  it{ should validate_presence_of :shipping_address }

end
