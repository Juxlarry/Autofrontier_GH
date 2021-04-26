class CreateVehicleTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :vehicle_types do |t|
      t.string :vehicle
      t.text :comments
      t.boolean :status

      t.timestamps
    end
  end
end
