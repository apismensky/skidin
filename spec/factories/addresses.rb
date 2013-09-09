FactoryGirl.define do
  factory :address1, class: Address do
    name { "#{Faker::Name.first_name} #{Faker::Name.last_name}" }
    line_1 { Faker::Address.street_address }
    city { Faker::Address.city }
    state { Faker::Address.state }
    postal_code { Faker::Address.postcode }
    email { Faker::Internet.email }
    phone_number { Faker::PhoneNumber.phone_number }
  end

  factory :address_fixed, class: Address do
    name { "Alexey Pismenskiy" }
    line_1 { "1156E 3300S" }
    line_2 { "apt.216" }
    city { "Salt Lake City" }
    state { "UT" }
    postal_code { "84106" }
    email { "abc@email.com" }
    phone_number { "12324234" }
  end
end
