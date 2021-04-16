class CreateCarModels < ActiveRecord::Migration[6.1]
  def change
    create_table :car_models do |t|
      t.string :name
      t.boolean :status
      t.text :comments

      t.timestamps
    end
  end
end
