class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :description
      t.string :tag
      t.date :deadline

      t.timestamps
    end
  end
end
