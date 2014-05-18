class CreateConnections < ActiveRecord::Migration
  def change
    create_table :connections do |t|
      t.integer :parent_atom_id
      t.integer :child_atom_id

      t.timestamps
    end
  end
end
