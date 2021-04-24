class AddCarModelDateToCars < ActiveRecord::Migration[6.1]
  def change
    add_column :cars, :car_model_year, :int
  end
end
