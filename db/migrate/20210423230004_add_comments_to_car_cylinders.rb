class AddCommentsToCarCylinders < ActiveRecord::Migration[6.1]
  def change
    add_column :car_cylinders, :comments, :text
  end
end
