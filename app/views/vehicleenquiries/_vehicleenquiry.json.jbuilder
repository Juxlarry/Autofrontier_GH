json.extract! vehicleenquiry, :id, :firstname, :lastname, :email, :phonenumber, :message, :status, :enquirer_user_id, :vehicle_user_id, :created_at, :updated_at
json.url vehicleenquiry_url(vehicleenquiry, format: :json)
