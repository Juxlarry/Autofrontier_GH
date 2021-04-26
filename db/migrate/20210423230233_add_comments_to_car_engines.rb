class AddCommentsToCarEngines < ActiveRecord::Migration[6.1]
  def change
    add_column :car_engines, :comments, :text
  end
end
