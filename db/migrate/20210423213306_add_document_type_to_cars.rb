class AddDocumentTypeToCars < ActiveRecord::Migration[6.1]
  def change
    add_column :cars, :car_doc_id, :int
  end
end
