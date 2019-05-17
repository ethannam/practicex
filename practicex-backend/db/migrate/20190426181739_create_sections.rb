class CreateSections < ActiveRecord::Migration[6.0]
  def change
    create_table :sections do |t|
      t.string :name
      t.integer :order
      t.integer :standard_time
      t.integer :total_questions
      t.string :version
      t.string :updates

      t.timestamps
    end
  end
end
