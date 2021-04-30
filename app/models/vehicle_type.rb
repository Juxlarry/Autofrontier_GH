class VehicleType < ApplicationRecord

    has_many :cars, class_name: 'Cars', foreign_key: :vehicle_type_id

end
