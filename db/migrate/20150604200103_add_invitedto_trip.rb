class AddInvitedtoTrip < ActiveRecord::Migration
  def change
    add_column :trips, :invited, :text
  end
end
