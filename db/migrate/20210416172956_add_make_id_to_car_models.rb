class AddMakeIdToCarModels < ActiveRecord::Migration[6.1]
  def change
    add_column :car_models, :make_id, :integer
  end
end
