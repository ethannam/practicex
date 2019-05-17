class CreatePaces < ActiveRecord::Migration[6.0]
  def change
    create_table :paces do |t|
      t.integer :total_time
      t.references :section, null: false, foreign_key: true
      t.references :accommodation, null: false, foreign_key: true

      t.timestamps
    end
  end
end
