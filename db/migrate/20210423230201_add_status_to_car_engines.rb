class AddStatusToCarEngines < ActiveRecord::Migration[6.1]
  def change
    add_column :car_engines, :status, :boolean
  end
end
