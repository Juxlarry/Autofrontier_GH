class AddStatusToCarCylinders < ActiveRecord::Migration[6.1]
  def change
    add_column :car_cylinders, :status, :boolean
  end
end
