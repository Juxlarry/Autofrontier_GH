json.extract! car_specification, :id, :car_id, :mileage, :fuel, :seats, :doors, :status, :comments, :description, :gear_type, :body_type, :created_at, :updated_at
json.url car_specification_url(car_specification, format: :json)
