class CreateNewsletterRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :newsletter_requests do |t|
      t.string :email
      t.boolean :status

      t.timestamps
    end
  end
end
