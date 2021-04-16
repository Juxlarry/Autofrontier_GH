json.extract! car_model, :id, :name, :status, :comments, :created_at, :updated_at
json.url car_model_url(car_model, format: :json)
