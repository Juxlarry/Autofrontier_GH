class AddCommentsToCarDocuments < ActiveRecord::Migration[6.1]
  def change
    add_column :car_documents, :comments, :text
  end
end
