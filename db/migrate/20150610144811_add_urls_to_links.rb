class AddUrlsToLinks < ActiveRecord::Migration
  def change
    add_column :links, :urls, :string
  end
end
