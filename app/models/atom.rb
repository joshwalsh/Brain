class Atom < ActiveRecord::Base
  validates :title, presence: true, uniqueness: true

  has_many :parent_connections, class_name: 'Connection', foreign_key: 'parent_atom_id', :dependent => :destroy
  has_many :child_connections, class_name: 'Connection', foreign_key: 'child_atom_id', :dependent => :destroy

  has_many :children, through: :parent_connections
  has_many :parents, through: :child_connections

  before_save :format_for_save

  def self.for_title(title)
    atom = where(title: title).first
  end

  def self.for_slug(slug_title)
    title = slug_title.gsub("-", " ").downcase
    atom = where(title: title).first
  end

  def slug
    self.title.downcase.gsub(" ", "-")  
  end

  def slug=(slug)
    self.title = slug.gsub("-", " ").downcase
  end

  def to_param
    slug
  end

  protected

  def format_for_save
    self.title.downcase!
  end
end
