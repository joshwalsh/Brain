class Atom < ActiveRecord::Base
  validates :title, presence: true
  validates :slug, presence: true, uniqueness: true

  has_many :parent_connections, class_name: 'Connection', foreign_key: 'parent_atom_id', :dependent => :destroy
  has_many :child_connections, class_name: 'Connection', foreign_key: 'child_atom_id', :dependent => :destroy

  has_many :children, through: :parent_connections
  has_many :parents, through: :child_connections

  has_paper_trail

  def self.for_slug(slug)
    atom = where(slug: slug).first
  end

  def self.for_title(title)
    atom = where(title: title).first
  end

  def title=(title)
    write_attribute(:title, title)
    write_attribute(:slug, slugify(title))
  end

  def influence
    total = Atom.all.count.to_f
    family = family_size.to_f

    (1 - (family / total)) * 100
  end

  def siblings
    siblings = []

    parents.each do |parent|
      siblings = siblings + parent.children
    end

    siblings = siblings.uniq
    siblings - [self]
  end

  def family_size
    siblings.count + parents.count + children.count
  end

  def to_param
    slug
  end

  protected

  def slugify(title)
    title.parameterize
  end
end
