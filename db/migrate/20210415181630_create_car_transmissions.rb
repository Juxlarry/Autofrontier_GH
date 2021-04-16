class CreateCarTransmissions < ActiveRecord::Migration[6.1]
  def change
    create_table :car_transmissions do |t|
      t.string :name
      t.boolean :status
      t.text :comments

      t.timestamps
    end
  end
end
