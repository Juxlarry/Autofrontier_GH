class AddCarKeyToCars < ActiveRecord::Migration[6.1]
  def change
    add_column :cars, :car_keys, :boolean
  end
end
