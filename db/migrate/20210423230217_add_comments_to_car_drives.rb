class AddCommentsToCarDrives < ActiveRecord::Migration[6.1]
  def change
    add_column :car_drives, :comments, :text
  end
end
