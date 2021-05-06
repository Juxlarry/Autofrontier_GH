class CreateVehicleenquiries < ActiveRecord::Migration[6.1]
  def change
    create_table :vehicleenquiries do |t|
      t.string :firstname
      t.string :lastname
      t.string :email
      t.string :phonenumber
      t.string :message
      t.boolean :status
      t.integer :enquirer_user_id
      t.integer :vehicle_user_id

      t.timestamps
    end
  end
end
