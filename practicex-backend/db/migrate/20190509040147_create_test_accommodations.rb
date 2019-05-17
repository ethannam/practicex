class CreateTestAccommodations < ActiveRecord::Migration[6.0]
  def change
    create_table :test_accommodations do |t|
      t.references :test, null: false, foreign_key: true
      t.references :accommodation, null: false, foreign_key: true

      t.timestamps
    end
  end
end
