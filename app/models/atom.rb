class Atom < ActiveRecord::Base
  validates :title, presence: true, uniqueness: true

  before_save :format_for_save

  protected

  def format_for_save
    self.title.downcase!
  end
end
