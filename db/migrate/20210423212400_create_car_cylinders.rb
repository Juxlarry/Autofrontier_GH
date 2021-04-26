class CreateCarCylinders < ActiveRecord::Migration[6.1]
  def change
    create_table :car_cylinders do |t|
      t.integer :cylinder

      t.timestamps
    end
  end
end
