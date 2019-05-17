class CreateInstructions < ActiveRecord::Migration[6.0]
  def change
    create_table :instructions do |t|
      t.integer :order
      t.string :content
      t.integer :time_cue
      t.integer :instruction_type
      t.boolean :giveBreak
      t.integer :break_time

      t.references :pace, null: false, foreign_key: true

      t.timestamps
    end
  end
end
