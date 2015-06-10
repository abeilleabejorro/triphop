class CreateLinks < ActiveRecord::Migration
  def change
    create_table :links do |t|
      t.belongs_to :user, index: true
      t.belongs_to :trip, index: true

      t.timestamps null: false
    end
    add_foreign_key :links, :users
    add_foreign_key :links, :trips
  end
end
