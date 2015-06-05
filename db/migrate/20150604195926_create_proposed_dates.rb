class CreateProposedDates < ActiveRecord::Migration
  def change
    create_table :proposed_dates do |t|
      t.date :start
      t.date :end

      t.timestamps null: false
    end
  end
end
