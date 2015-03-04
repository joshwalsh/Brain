class AddSlugToAtom < ActiveRecord::Migration
  def change
    add_column :atoms, :slug, :string
  end
end
