class CreateGroupCosts < ActiveRecord::Migration
  def change
    create_table :group_costs do |t|
      t.string :item
      t.integer :price

      t.timestamps null: false
    end
  end
end
