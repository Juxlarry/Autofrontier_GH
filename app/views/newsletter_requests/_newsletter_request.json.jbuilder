json.extract! newsletter_request, :id, :email, :status, :created_at, :updated_at
json.url newsletter_request_url(newsletter_request, format: :json)
