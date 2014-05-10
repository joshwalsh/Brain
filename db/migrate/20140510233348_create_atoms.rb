class CreateAtoms < ActiveRecord::Migration
  def change
    create_table :atoms do |t|
      t.string :title

      t.timestamps
    end
  end
end
