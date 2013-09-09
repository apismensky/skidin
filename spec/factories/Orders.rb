FactoryGirl.define do
  factory :order do
    status { "SHIPPED" }
    order_lines {[FactoryGirl.create(:order_line1), FactoryGirl.create(:order_line2)]}
    shipping_address { FactoryGirl.create(:address1) }
  end

  factory :order_with_fix_address, parent: :order do
    shipping_address { FactoryGirl.create(:address_fixed) }
  end
end