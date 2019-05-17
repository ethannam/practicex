class CreateSectionAttemptAccommodations < ActiveRecord::Migration[6.0]
  def change
    create_table :section_attempt_accommodations do |t|
      t.references :section_attempt, null: false, foreign_key: true
      t.references :accommodation, null: false, foreign_key: true

      t.timestamps
    end
  end
end
