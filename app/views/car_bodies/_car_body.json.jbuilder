json.extract! car_body, :id, :type_name, :status, :comments, :created_at, :updated_at
json.url car_body_url(car_body, format: :json)
