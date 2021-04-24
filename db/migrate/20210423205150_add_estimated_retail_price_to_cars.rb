class AddEstimatedRetailPriceToCars < ActiveRecord::Migration[6.1]
  def change
    add_column :cars, :estimated_retail_price, :float
  end
end
