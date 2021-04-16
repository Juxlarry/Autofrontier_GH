class CreateCarBodies < ActiveRecord::Migration[6.1]
  def change
    create_table :car_bodies do |t|
      t.string :type_name
      t.boolean :status
      t.text :comments

      t.timestamps
    end
  end
end
