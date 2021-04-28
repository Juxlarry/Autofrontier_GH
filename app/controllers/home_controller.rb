class HomeController < ApplicationController
  def index
    @cars_display = Car.joins("
      INNER JOIN car_types ON car_types.id = cars.car_type_id
      INNER JOIN fuel_types ON fuel_types.id = cars.fuel_type_id
      INNER JOIN car_colours ON car_colours.id = cars.colour_id
      INNER JOIN car_bodies ON car_bodies.id = cars.body_type_id
      INNER JOIN car_transmissions ON car_transmissions.id = cars.transmission_type_id
      INNER JOIN car_makes ON car_makes.id = cars.make_id
      INNER JOIN car_models ON car_models.id = cars.model_id
      INNER JOIN car_drives ON car_drives.id = cars.drive_type
      INNER JOIN car_cylinders ON car_cylinders.id = cars.car_cylinder
      INNER JOIN car_documents ON car_documents.id = cars.car_doc_id
      INNER JOIN car_engines ON car_engines.id = cars.car_engine_id
      INNER JOIN vehicle_types ON vehicle_types.id = cars.vehicle_type_id
      ").select(
      " cars.id, car_types.id as car_type_id, car_types.name as car_type, car_name, car_price, 
        mileage as car_mileage, car_model_year, cars.description as car_description, car_registration_number,
        car_registration_first_date, trim_details, 
        variant_details, cars.seats as car_seat, cars.doors as car_door, cars.comments as comment_on_car,
        car_keys, car_primary_damage, car_secondary_damage, estimated_retail_price, car_highlights, 
        fuel_types.fuel_type as car_fuel, car_colours.name as car_colour, car_bodies.type_name as car_body,
        car_transmissions.name as car_transmission, car_makes.name as car_make, car_models.name as car_model,
        car_drives.drive_type as car_drive, car_cylinders.cylinder as car_cylinder, car_documents.doc_type as car_doc,
        car_documents.doc_valid as car_doc_valid, car_engines.engine_type as car_engine, vehicle_types.vehicle as vehicle_type
      "
      ).where(car_type_id: 1 )
  
  end
end
