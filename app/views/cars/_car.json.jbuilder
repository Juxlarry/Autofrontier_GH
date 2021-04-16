json.extract! car, :id, :car_name, :car_type_id, :car_registration_number, :car_registration_first_date, :car_price, :fuel_type_id, :mileage, :colour_id, :body_type_id, :description, :transmission_type_id, :trim_details, :derivative_details, :make_id, :model_id, :variant_details, :seats, :doors, :status, :comments, :created_at, :updated_at
json.url car_url(car, format: :json)
