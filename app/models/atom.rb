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

  def slug=(slug)
    write_attribute(:title, deslugify(slug))
    write_attribute(:slug, slug)
  end

  def to_param
    slug
  end

  protected

  def slugify(title)
    title.parameterize
  end

  def deslugify(slug)
    slug.humanize
  end
end
