class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :username
      t.string :password_digest
      t.string :first_name
      t.string :last_name
      t.date :birthday
      t.string :city
      t.string :state
      t.string :zipcode
      t.string :country
      t.integer :sex
      t.integer :grade

      t.timestamps
    end
  end
end
