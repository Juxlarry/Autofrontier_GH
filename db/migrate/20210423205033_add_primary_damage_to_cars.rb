class AddPrimaryDamageToCars < ActiveRecord::Migration[6.1]
  def change
    add_column :cars, :car_primary_damage, :string
  end
end
