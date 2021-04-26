class AddVehicleTypeToCars < ActiveRecord::Migration[6.1]
  def change
    add_column :cars, :vehicle_type_id, :int
  end
end
