json.extract! car_type, :id, :name, :status, :comments, :created_at, :updated_at
json.url car_type_url(car_type, format: :json)
