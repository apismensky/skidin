# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :product do
    name "Backpack"
    short_description "Crestrail pack"
    medium_description "REI Crestrail 70 Pack"
    long_description "The REI Crestrail 70 pack incorporates the latest concepts in pack design, materials and components, balancing comfort with performance and durability for weekend or multiday trips."
    image_small "http://www.rei.com/zoom/rr/58669da0-3b05-423b-a594-7b4e5283f203.jpg/150"
    image_medium "http://www.rei.com/media/rr/edb7aa03-683d-4322-9c29-67a5476998c1.jpg"
    price 10000
  end

  factory :product2, class: Product do
      name "Seiko Mantel Clock"
      short_description "Seiko Mantel Clock"
      medium_description "Seiko Mantel Clock Seiko Mantel Clock"
      long_description "Seiko Quartz Mantel Clock. Features dark brown solid oak case, ornate vine pattern dial, Westminster/Whittington quarter hour chimes and hourly strikes. H. 16.25"
      image_small "https://resources.hs.llnwd.net/e1/lineitems/odw/m/non_dangle/1003080_rgb_s.jpg"
      image_medium "https://resources.hs.llnwd.net/e1/lineitems/odw/m/non_dangle/1003080_rgb_m.jpg"
      price 1500
    end
end
