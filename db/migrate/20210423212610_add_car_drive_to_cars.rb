class AddCarDriveToCars < ActiveRecord::Migration[6.1]
  def change
    add_column :cars, :drive_type, :int
  end
end
