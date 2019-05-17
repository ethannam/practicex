class CreateSectionAttempts < ActiveRecord::Migration[6.0]
  def change
    create_table :section_attempts do |t|
      t.datetime :start_date
      t.datetime :end_date
      t.integer :time_remaining
      t.integer :time_over
      t.references :section, null: false, foreign_key: true
      t.references :section_form, null: true, foreign_key: true
      t.references :test_attempt, null: false, foreign_key: true
      t.references :next_section_attempt, references: :section_attempts, null: true, foreign_key: { to_table: :section_attempts }
      t.references :pace, null: true, foreign_key: true

      t.timestamps
    end
  end
end
