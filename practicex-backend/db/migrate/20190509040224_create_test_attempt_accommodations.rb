class CreateTestAttemptAccommodations < ActiveRecord::Migration[6.0]
  def change
    create_table :test_attempt_accommodations do |t|
      t.references :test_attempt, null: false, foreign_key: true
      t.references :accommodation, null: false, foreign_key: true

      t.timestamps
    end
  end
end
