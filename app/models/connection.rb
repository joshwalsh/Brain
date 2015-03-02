class Connection < ActiveRecord::Base
  validates :parent_atom_id, :child_atom_id, presence: true

  belongs_to :parent, class_name: 'Atom', foreign_key: 'parent_atom_id'
  belongs_to :child, class_name: 'Atom', foreign_key: 'child_atom_id'

  has_paper_trail
end
