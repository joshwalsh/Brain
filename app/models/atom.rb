class Atom < ActiveRecord::Base
  validates :title, presence: true, uniqueness: true

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
