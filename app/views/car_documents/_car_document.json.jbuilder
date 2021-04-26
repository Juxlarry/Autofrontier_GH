json.extract! car_document, :id, :doc_type, :doc_valid, :created_at, :updated_at
json.url car_document_url(car_document, format: :json)
