class Car < ApplicationRecord
    has_many_attached :images

    belongs_to :a_vehicle, class_name: 'VehicleType', foreign_key: :vehicle_type_id

    belongs_to :a_user, class_name: 'User', foreign_key: :car_user_id

    # def thumbnail input 
    # end
end

