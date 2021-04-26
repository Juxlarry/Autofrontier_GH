class AddModelDateToCarModels < ActiveRecord::Migration[6.1]
  def change
    add_column :car_models, :model_date, :int
  end
end
