class CreateTestAttempts < ActiveRecord::Migration[6.0]
  def change
    create_table :test_attempts do |t|
      t.integer :attempt_type
      t.datetime :start_date
      t.datetime :end_date
      t.references :test, null: false, foreign_key: true
      t.references :test_form, null: true, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
