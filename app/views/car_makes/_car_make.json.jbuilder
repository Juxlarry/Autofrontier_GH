json.extract! car_make, :id, :name, :status, :comments, :created_at, :updated_at
json.url car_make_url(car_make, format: :json)
