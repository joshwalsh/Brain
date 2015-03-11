class AddDescriptions < ActiveRecord::Migration
  def change
    add_column :connections, :description, :text
    add_column :atoms, :description, :text
  end
end
