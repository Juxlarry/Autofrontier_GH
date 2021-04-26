class AddSecondaryDamageToCars < ActiveRecord::Migration[6.1]
  def change
    add_column :cars, :car_secondary_damage, :string
  end
end
