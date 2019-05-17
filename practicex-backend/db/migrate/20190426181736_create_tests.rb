class CreateTests < ActiveRecord::Migration[6.0]
  def change
    create_table :tests do |t|
      t.string :name
      t.string :version
      t.string :updates

      t.timestamps
    end
  end
end