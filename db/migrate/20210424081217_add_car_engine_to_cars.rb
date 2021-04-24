class AddCarEngineToCars < ActiveRecord::Migration[6.1]
  def change
    add_column :cars, :car_engine_id, :int
  end
end
