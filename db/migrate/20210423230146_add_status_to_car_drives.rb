class AddStatusToCarDrives < ActiveRecord::Migration[6.1]
  def change
    add_column :car_drives, :status, :boolean
  end
end
