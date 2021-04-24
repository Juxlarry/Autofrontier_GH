class AddCarCylinderToCars < ActiveRecord::Migration[6.1]
  def change
    add_column :cars, :car_cylinder, :int
  end
end
