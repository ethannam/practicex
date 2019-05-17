class CreateSectionAccommodations < ActiveRecord::Migration[6.0]
  def change
    create_table :section_accommodations do |t|
      t.references :accommodation, null: false, foreign_key: true
      t.references :section, null: false, foreign_key: true

      t.timestamps
    end
  end
end
