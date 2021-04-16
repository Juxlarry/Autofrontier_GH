class CreateCars < ActiveRecord::Migration[6.1]
  def change
    create_table :cars do |t|
      t.string :car_name
      t.integer :car_type_id
      t.string :car_registration_number
      t.datetime :car_registration_first_date
      t.float :car_price
      t.integer :fuel_type_id
      t.float :mileage
      t.integer :colour_id
      t.integer :body_type_id
      t.text :description
      t.integer :transmission_type_id
      t.string :trim_details
      t.string :derivative_details
      t.integer :make_id
      t.integer :model_id
      t.string :variant_details
      t.integer :seats
      t.integer :doors
      t.boolean :status
      t.text :comments

      t.timestamps
    end
  end
end
