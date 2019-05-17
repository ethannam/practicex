class CreateTestForms < ActiveRecord::Migration[6.0]
  def change
    create_table :test_forms do |t|
      t.string :code
      t.date :admin_date
      t.integer :admin_region
      t.string :admin_country
      t.references :test, null: false, foreign_key: true

      t.timestamps
    end
  end
end
