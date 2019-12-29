class CreateSearches < ActiveRecord::Migration[6.0]
  def change
    create_table :searches do |t|
      t.string :keyword
      t.date :deadline

      t.timestamps
    end
  end
end
