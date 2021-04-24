class CreateCarDrives < ActiveRecord::Migration[6.1]
  def change
    create_table :car_drives do |t|
      t.string :drive_type

      t.timestamps
    end
  end
end
