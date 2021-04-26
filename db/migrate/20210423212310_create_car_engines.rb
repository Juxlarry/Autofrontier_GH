class CreateCarEngines < ActiveRecord::Migration[6.1]
  def change
    create_table :car_engines do |t|
      t.string :engine_type

      t.timestamps
    end
  end
end
