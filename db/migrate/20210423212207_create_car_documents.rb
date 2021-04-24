class CreateCarDocuments < ActiveRecord::Migration[6.1]
  def change
    create_table :car_documents do |t|
      t.string :doc_type
      t.boolean :doc_valid

      t.timestamps
    end
  end
end
