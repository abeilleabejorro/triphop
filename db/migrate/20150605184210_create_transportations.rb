class CreateTransportations < ActiveRecord::Migration
  def change
    create_table :transportations do |t|
      t.string :type

      t.timestamps null: false
    end
  end
end
