class AddUserToProposedDates < ActiveRecord::Migration
  def change
    add_reference :proposed_dates, :user, index: true
    add_foreign_key :proposed_dates, :users
  end
end
