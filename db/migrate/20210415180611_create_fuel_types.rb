class CreateFuelTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :fuel_types do |t|
      t.string :fuel_type
      t.boolean :status
      t.text :comments

      t.timestamps
    end
  end
end
