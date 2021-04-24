class AddHighlightsToCars < ActiveRecord::Migration[6.1]
  def change
    add_column :cars, :car_highlights, :string
  end
end
