class AddCarUserIdToCars < ActiveRecord::Migration[6.1]
  def change
    add_column :cars, :car_user_id, :int
  end
end
