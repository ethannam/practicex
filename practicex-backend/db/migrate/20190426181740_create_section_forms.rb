class CreateSectionForms < ActiveRecord::Migration[6.0]
  def change
    create_table :section_forms do |t|
      t.references :test_form, null: false, foreign_key: true
      t.references :section, null: false, foreign_key: true

      t.timestamps
    end
  end
end
