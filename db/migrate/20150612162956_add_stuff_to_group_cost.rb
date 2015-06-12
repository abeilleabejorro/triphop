class AddStuffToGroupCost < ActiveRecord::Migration
  def change
    add_reference :group_costs, :user, index: true
    add_foreign_key :group_costs, :users
    add_reference :group_costs, :trip, index: true
    add_foreign_key :group_costs, :trips
  end
end
