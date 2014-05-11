class Atom < ActiveRecord::Base
  validates :title, presence: true
end
