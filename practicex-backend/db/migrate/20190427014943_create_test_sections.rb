class CreateTestSections < ActiveRecord::Migration[6.0]
  def change
    create_table :test_sections do |t|
      t.references :test, null: false, foreign_key: true
      t.references :section, null: false, foreign_key: true

      t.timestamps
    end
  end
end
