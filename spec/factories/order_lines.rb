FactoryGirl.define do

  factory :order_line1, class: OrderLine do
    quantity 1
    unit_price 100
    association :product, factory: :product
  end

  factory :order_line2, class: OrderLine do
    quantity 2
    unit_price 200
    association :product, factory: :product2
  end

end
