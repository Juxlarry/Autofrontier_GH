class AddStatusToCarDocuments < ActiveRecord::Migration[6.1]
  def change
    add_column :car_documents, :status, :boolean
  end
end
